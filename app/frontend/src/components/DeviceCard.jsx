import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Power, 
  Thermometer, 
  Sun, 
  Fan, 
  Settings,
  Zap
} from 'lucide-react';

const DeviceCard = ({ device, onToggle, onAdjust }) => {
  const getDeviceIcon = (type) => {
    switch (type) {
      case 'ac': return <Thermometer size={24} className="text-blue-600" />;
      case 'heater': return <Thermometer size={24} className="text-orange-600" />;
      case 'light': return <Sun size={24} className="text-yellow-600" />;
      case 'fan': return <Fan size={24} className="text-green-600" />;
      default: return <Settings size={24} className="text-gray-600" />;
    }
  };

  const getDeviceTypeLabel = (type) => {
    switch (type) {
      case 'ac': return 'Air Conditioner';
      case 'heater': return 'Heater';
      case 'light': return 'Light';
      case 'fan': return 'Fan';
      default: return 'Device';
    }
  };

  const handleToggle = () => {
    onToggle(device.id, !device.isOn);
  };

  const handleAdjust = (adjustment) => {
    onAdjust(device.id, adjustment);
  };

  return (
    <Card className="bg-white border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getDeviceIcon(device.type)}
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">
                {device.name}
              </CardTitle>
              <p className="text-sm text-gray-600">{device.room}</p>
            </div>
          </div>
          <Badge 
            variant={device.isOn ? "default" : "outline"} 
            className={device.isOn ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
          >
            {device.isOn ? 'ON' : 'OFF'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Energy Usage */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-yellow-600" />
            <span className="text-sm text-gray-600">Energy Usage</span>
          </div>
          <span className="text-sm font-medium text-gray-800">
            {device.isOn ? `${device.energyUsage}W` : '0W'}
          </span>
        </div>

        {/* Device-specific controls */}
        {device.type === 'ac' || device.type === 'heater' ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Temperature</span>
              <span className="text-sm font-medium text-gray-800">
                {device.temperature}°C
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAdjust({ temperature: device.temperature - 1 })}
                disabled={!device.isOn}
                className="flex-1"
              >
                -
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAdjust({ temperature: device.temperature + 1 })}
                disabled={!device.isOn}
                className="flex-1"
              >
                +
              </Button>
            </div>
          </div>
        ) : device.type === 'light' || device.type === 'fan' ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Level</span>
              <span className="text-sm font-medium text-gray-800">
                {device.level}%
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAdjust({ level: Math.max(0, device.level - 20) })}
                disabled={!device.isOn}
                className="flex-1"
              >
                -
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAdjust({ level: Math.min(100, device.level + 20) })}
                disabled={!device.isOn}
                className="flex-1"
              >
                +
              </Button>
            </div>
          </div>
        ) : null}

        {/* Toggle Button */}
        <Button
          onClick={handleToggle}
          variant={device.isOn ? "outline" : "default"}
          className="w-full"
          size="lg"
        >
          <Power size={16} className="mr-2" />
          {device.isOn ? 'Turn Off' : 'Turn On'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
