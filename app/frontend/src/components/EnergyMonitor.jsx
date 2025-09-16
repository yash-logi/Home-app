import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Zap, 
  TrendingDown, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Clock,
  Leaf,
  AlertTriangle
} from 'lucide-react';

const EnergyMonitor = ({ devices }) => {
  const [currentUsage, setCurrentUsage] = useState(0);
  const [dailyUsage, setDailyUsage] = useState(0);
  const [monthlyBill, setMonthlyBill] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    // Calculate real-time energy usage from devices
    const totalCurrent = devices.reduce((sum, device) => {
      return sum + (device.isOn ? device.energyUsage : 0);
    }, 0);
    
    setCurrentUsage(totalCurrent);
    
    // Mock calculations for demo
    setDailyUsage(totalCurrent * 24 / 1000); // kWh per day
    setMonthlyBill(totalCurrent * 24 * 30 * 0.12 / 1000); // $0.12 per kWh
    setSavings(Math.max(0, 150 - (totalCurrent * 24 * 30 * 0.12 / 1000)));
  }, [devices]);

  const getEfficiencyStatus = () => {
    if (currentUsage < 1000) return { status: 'Excellent', color: 'bg-green-100 text-green-800', icon: Leaf };
    if (currentUsage < 2000) return { status: 'Good', color: 'bg-blue-100 text-blue-800', icon: TrendingDown };
    if (currentUsage < 3000) return { status: 'Fair', color: 'bg-yellow-100 text-yellow-800', icon: TrendingUp };
    return { status: 'High Usage', color: 'bg-red-100 text-red-800', icon: AlertTriangle };
  };

  const efficiency = getEfficiencyStatus();
  const StatusIcon = efficiency.icon;

  return (
    <div className="space-y-6">
      {/* Current Usage Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-white border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Zap className="text-yellow-600" size={32} />
            Current Energy Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {currentUsage.toLocaleString()}
              </div>
              <div className="text-lg text-gray-600">Watts</div>
              <div className="text-sm text-gray-500 mt-1">Right Now</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Badge className={`text-base px-4 py-2 ${efficiency.color}`}>
                <StatusIcon size={18} className="mr-2" />
                {efficiency.status}
              </Badge>
              <div className="text-sm text-gray-600 mt-2">
                Energy Efficiency Rating
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-2 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="text-green-600" size={24} />
              Today's Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {dailyUsage.toFixed(1)}
            </div>
            <div className="text-gray-600">kWh</div>
            <div className="text-sm text-gray-500 mt-2">
              Est. cost: ${(dailyUsage * 0.12).toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="text-blue-600" size={24} />
              Monthly Bill
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              ${monthlyBill.toFixed(0)}
            </div>
            <div className="text-gray-600">Estimated</div>
            <div className="text-sm text-gray-500 mt-2">
              Based on current usage
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Leaf className="text-emerald-600" size={24} />
              Potential Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600 mb-1">
              ${savings.toFixed(0)}
            </div>
            <div className="text-gray-600">This month</div>
            <div className="text-sm text-gray-500 mt-2">
              With optimization
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Breakdown */}
      <Card className="bg-white border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Clock className="text-purple-600" size={24} />
            Device Energy Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {devices.map((device) => {
              const percentage = currentUsage > 0 ? 
                ((device.isOn ? device.energyUsage : 0) / currentUsage * 100) : 0;
              
              return (
                <div key={device.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${
                      device.isOn ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                    <span className="font-semibold text-gray-800">{device.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">
                      {device.isOn ? device.energyUsage : 0}W
                    </div>
                    <div className="text-sm text-gray-600">
                      {percentage.toFixed(1)}% of total
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Energy Saving Tips */}
      <Card className="bg-gradient-to-r from-green-50 to-white border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Leaf className="text-green-600" size={24} />
            Smart Energy Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-2">💡 Lighting</h4>
              <p className="text-gray-600 text-sm">
                Reduce brightness by 20% in the evening to save energy without compromising comfort.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-2">❄️ Cooling</h4>
              <p className="text-gray-600 text-sm">
                Set AC to 24°C instead of 22°C to reduce energy consumption by 15%.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-2">🔥 Heating</h4>
              <p className="text-gray-600 text-sm">
                Turn off heaters when leaving rooms for more than 30 minutes.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-2">🌀 Fans</h4>
              <p className="text-gray-600 text-sm">
                Use fans with AC to circulate air and raise thermostat by 2°C.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnergyMonitor;