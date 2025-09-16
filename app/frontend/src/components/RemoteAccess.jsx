import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  UserPlus, 
  Users, 
  Shield, 
  Eye, 
  Settings, 
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const RemoteAccess = ({ devices, currentUser = { name: "John Smith", role: "primary" } }) => {
  const [caregivers, setCaregivers] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      role: "Healthcare Provider",
      permissions: ["view", "control", "emergency"],
      status: "active",
      lastAccess: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: 2,
      name: "Michael Smith",
      email: "michael.smith@email.com", 
      phone: "+1 (555) 987-6543",
      role: "Family Member",
      permissions: ["view", "control"],
      status: "active",
      lastAccess: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      phone: "+1 (555) 456-7890", 
      role: "Caregiver",
      permissions: ["view", "emergency"],
      status: "pending",
      lastAccess: null
    }
  ]);

  const [newCaregiver, setNewCaregiver] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Family Member'
  });

  const [accessLogs, setAccessLogs] = useState([
    {
      id: 1,
      caregiver: "Dr. Sarah Johnson",
      action: "Turned off heater remotely",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      type: "control"
    },
    {
      id: 2,
      caregiver: "Michael Smith", 
      action: "Viewed energy usage dashboard",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: "view"
    },
    {
      id: 3,
      caregiver: "Dr. Sarah Johnson",
      action: "Emergency alert - High temperature detected",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      type: "emergency"
    }
  ]);

  const { toast } = useToast();

  const handleAddCaregiver = () => {
    if (!newCaregiver.name || !newCaregiver.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in name and email fields.",
        variant: "destructive"
      });
      return;
    }

    const caregiver = {
      id: Date.now(),
      ...newCaregiver,
      permissions: ["view"],
      status: "pending",
      lastAccess: null
    };

    setCaregivers(prev => [...prev, caregiver]);
    setNewCaregiver({ name: '', email: '', phone: '', role: 'Family Member' });
    
    toast({
      title: "Caregiver Added",
      description: `Invitation sent to ${newCaregiver.name}`,
    });
  };

  const handleUpdatePermissions = (caregiverId, permission, add) => {
    setCaregivers(prev => prev.map(caregiver => {
      if (caregiver.id === caregiverId) {
        let newPermissions;
        if (add && !caregiver.permissions.includes(permission)) {
          newPermissions = [...caregiver.permissions, permission];
        } else if (!add) {
          newPermissions = caregiver.permissions.filter(p => p !== permission);
        } else {
          return caregiver;
        }
        
        return { ...caregiver, permissions: newPermissions };
      }
      return caregiver;
    }));

    toast({
      title: "Permissions Updated",
      description: `${permission} access ${add ? 'granted' : 'removed'}`,
    });
  };

  const handleRemoveCaregiver = (caregiverId) => {
    setCaregivers(prev => prev.filter(c => c.id !== caregiverId));
    toast({
      title: "Caregiver Removed",
      description: "Access has been revoked",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { variant: "default", color: "bg-green-100 text-green-800", label: "Active" },
      pending: { variant: "secondary", color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      inactive: { variant: "outline", color: "bg-gray-100 text-gray-800", label: "Inactive" }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const getActionIcon = (type) => {
    switch (type) {
      case 'control': return <Settings size={16} className="text-blue-600" />;
      case 'emergency': return <AlertTriangle size={16} className="text-red-600" />;
      default: return <Eye size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="caregivers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="caregivers">Manage Caregivers</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="logs">Access Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="caregivers">
          <div className="space-y-6">
            {/* Add New Caregiver */}
            <Card className="bg-gradient-to-r from-blue-50 to-white border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <UserPlus className="text-blue-600" size={24} />
                  Add New Caregiver
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="name" className="text-base font-medium">Full Name</Label>
                    <Input
                      id="name"
                      value={newCaregiver.name}
                      onChange={(e) => setNewCaregiver(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter caregiver's name"
                      className="h-12 text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-base font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newCaregiver.email}
                      onChange={(e) => setNewCaregiver(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter email address"
                      className="h-12 text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-base font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newCaregiver.phone}
                      onChange={(e) => setNewCaregiver(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter phone number"
                      className="h-12 text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-base font-medium">Role</Label>
                    <select
                      id="role"
                      value={newCaregiver.role}
                      onChange={(e) => setNewCaregiver(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full h-12 px-3 border border-gray-300 rounded-md text-base"
                    >
                      <option value="Family Member">Family Member</option>
                      <option value="Healthcare Provider">Healthcare Provider</option>
                      <option value="Caregiver">Professional Caregiver</option>
                      <option value="Emergency Contact">Emergency Contact</option>
                    </select>
                  </div>
                </div>
                <Button onClick={handleAddCaregiver} size="lg" className="w-full md:w-auto">
                  <UserPlus size={20} className="mr-2" />
                  Send Invitation
                </Button>
              </CardContent>
            </Card>

            {/* Current Caregivers */}
            <Card className="bg-white border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Users className="text-green-600" size={24} />
                  Current Caregivers ({caregivers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caregivers.map((caregiver) => (
                    <div key={caregiver.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-800">{caregiver.name}</h4>
                          {getStatusBadge(caregiver.status)}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail size={14} />
                            {caregiver.email}
                          </div>
                          {caregiver.phone && (
                            <div className="flex items-center gap-2">
                              <Phone size={14} />
                              {caregiver.phone}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Shield size={14} />
                            {caregiver.role}
                          </div>
                          {caregiver.lastAccess && (
                            <div className="flex items-center gap-2">
                              <Clock size={14} />
                              Last access: {caregiver.lastAccess.toLocaleString()}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {caregiver.permissions.map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRemoveCaregiver(caregiver.id)}
                        className="ml-4 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="permissions">
          <Card className="bg-white border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Shield className="text-purple-600" size={24} />
                Access Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Control what each caregiver can do when accessing your home energy system remotely.
                </AlertDescription>
              </Alert>

              <div className="space-y-6">
                {caregivers.filter(c => c.status === 'active').map((caregiver) => (
                  <div key={caregiver.id} className="p-4 border rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">{caregiver.name}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">View Access</div>
                          <div className="text-sm text-gray-600">Monitor energy usage and device status</div>
                        </div>
                        <Button
                          size="sm"
                          variant={caregiver.permissions.includes('view') ? 'default' : 'outline'}
                          onClick={() => handleUpdatePermissions(
                            caregiver.id, 
                            'view', 
                            !caregiver.permissions.includes('view')
                          )}
                        >
                          {caregiver.permissions.includes('view') ? 'Enabled' : 'Disabled'}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">Device Control</div>
                          <div className="text-sm text-gray-600">Turn devices on/off and adjust settings</div>
                        </div>
                        <Button
                          size="sm"
                          variant={caregiver.permissions.includes('control') ? 'default' : 'outline'}
                          onClick={() => handleUpdatePermissions(
                            caregiver.id, 
                            'control', 
                            !caregiver.permissions.includes('control')
                          )}
                        >
                          {caregiver.permissions.includes('control') ? 'Enabled' : 'Disabled'}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">Emergency Access</div>
                          <div className="text-sm text-gray-600">Override controls during emergencies</div>
                        </div>
                        <Button
                          size="sm"
                          variant={caregiver.permissions.includes('emergency') ? 'default' : 'outline'}
                          onClick={() => handleUpdatePermissions(
                            caregiver.id, 
                            'emergency', 
                            !caregiver.permissions.includes('emergency')
                          )}
                        >
                          {caregiver.permissions.includes('emergency') ? 'Enabled' : 'Disabled'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card className="bg-white border-2 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <Clock className="text-indigo-600" size={24} />
                Access Activity Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border">
                    {getActionIcon(log.type)}
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{log.caregiver}</div>
                      <div className="text-gray-600">{log.action}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {log.timestamp.toLocaleString()}
                      </div>
                    </div>
                    <Badge 
                      variant="secondary"
                      className={`${
                        log.type === 'emergency' ? 'bg-red-100 text-red-800' : 
                        log.type === 'control' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {log.type}
                    </Badge>
                  </div>
                ))}
              </div>
              
              {accessLogs.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Clock size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No recent activity to display</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RemoteAccess;