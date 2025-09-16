import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Toaster } from "./components/ui/toaster";
import DeviceCard from "./components/DeviceCard";
import EnergyMonitor from "./components/EnergyMonitor";
import VoiceControl from "./components/VoiceControl";
import RemoteAccess from "./components/RemoteAccess";
import { mockApi } from "./components/mockData";
import {  
  HomeIcon, 
  Zap, 
  Mic, 
  Users, 
  Settings,
  Shield,
  Bell,
  User,
  Menu,
  X
} from 'lucide-react';

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      const [devicesData, userData] = await Promise.all([
        mockApi.getDevices(),
        mockApi.getUser()
      ]);
      
      setDevices(devicesData);
      setUser(userData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeviceToggle = async (deviceId, isOn) => {
    try {
      const updatedDevice = await mockApi.updateDevice(deviceId, { isOn });
      if (updatedDevice) {
        setDevices(prev => prev.map(device => 
          device.id === deviceId ? updatedDevice : device
        ));
      }
    } catch (error) {
      console.error('Error toggling device:', error);
    }
  };

  const handleDeviceAdjust = async (deviceId, adjustments) => {
    try {
      const updatedDevice = await mockApi.updateDevice(deviceId, adjustments);
      if (updatedDevice) {
        setDevices(prev => prev.map(device => 
          device.id === deviceId ? updatedDevice : device
        ));
      }
    } catch (error) {
      console.error('Error adjusting device:', error);
    }
  };

  const handleDeviceControl = (deviceId, updates) => {
    handleDeviceAdjust(deviceId, updates);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading your smart home system...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <HomeIcon className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Smart Home Energy</h1>
                <p className="text-sm text-gray-600">Management System</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                System Online
              </Badge>
              {user && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="text-blue-600" size={16} />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">Primary User</div>
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3">
              {user && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">Primary User</div>
                  </div>
                </div>
              )}
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                System Online
              </Badge>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<Tabs value={activeTab} onChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-2/3 mx-auto mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <HomeIcon size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="energy" className="flex items-center gap-2">
              <Zap size={18} />
              <span className="hidden sm:inline">Energy</span>
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Mic size={18} />
              <span className="hidden sm:inline">Voice</span>
            </TabsTrigger>
            <TabsTrigger value="remote" className="flex items-center gap-2">
              <Users size={18} />
              <span className="hidden sm:inline">Remote</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="space-y-8">
              {/* Welcome Section */}
              <Card className="bg-gradient-to-r from-blue-50 via-white to-purple-50 border-2 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">
                    Welcome back, {user?.name}!
                  </CardTitle>
                  <p className="text-gray-600 text-lg">
                    Manage your home devices easily and efficiently. All controls are designed for simple, one-touch operation.
                  </p>
                </CardHeader>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white border-2 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="text-green-600" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {devices.filter(d => d.isOn).length}/{devices.length}
                    </div>
                    <div className="text-gray-600">Devices Active</div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-2 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Settings className="text-blue-600" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {devices.reduce((sum, d) => sum + (d.isOn ? d.energyUsage : 0), 0)}W
                    </div>
                    <div className="text-gray-600">Current Usage</div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-2 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="text-purple-600" size={24} />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">Good</div>
                    <div className="text-gray-600">Energy Efficiency</div>
                  </CardContent>
                </Card>
              </div>

              {/* Device Controls */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Device Controls</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {devices.map((device) => (
                    <DeviceCard
                      key={device.id}
                      device={device}
                      onToggle={handleDeviceToggle}
                      onAdjust={handleDeviceAdjust}
                    />
                  ))}
                </div>
              </div>

              {/* Emergency Controls */}
              <Card className="bg-red-50 border-2 border-red-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl text-red-800">
                    <Shield className="text-red-600" size={24} />
                    Emergency Controls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="h-16 border-red-300 text-red-700 hover:bg-red-100"
                      onClick={() => {
                        devices.forEach(device => {
                          handleDeviceToggle(device.id, false);
                        });
                      }}
                    >
                      Turn Off All Devices
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="h-16 border-orange-300 text-orange-700 hover:bg-orange-100"
                    >
                      Call Emergency Contact
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="h-16 border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      System Status Check
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="energy">
            <EnergyMonitor devices={devices} />
          </TabsContent>

          <TabsContent value="voice">
            <VoiceControl devices={devices} onDeviceControl={handleDeviceControl} />
          </TabsContent>

          <TabsContent value="remote">
            <RemoteAccess devices={devices} currentUser={user} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
