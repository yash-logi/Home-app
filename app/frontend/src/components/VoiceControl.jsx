import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  MessageSquare,
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const VoiceControl = ({ devices, onDeviceControl }) => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Simulated voice commands for demo
  const voiceCommands = [
    "Turn on living room lights",
    "Set AC to 22 degrees",
    "Turn off heater",
    "Increase fan speed",
    "Turn on all lights",
    "Set heater to 25 degrees",
    "Turn off AC",
    "Reduce light brightness"
  ];

  const processVoiceCommand = (command) => {
    setIsProcessing(true);
    setLastCommand(command);

    // Simulate processing delay
    setTimeout(() => {
      let success = false;
      let action = '';

      // Parse command and execute
      const lowerCommand = command.toLowerCase();
      
      if (lowerCommand.includes('turn on') && lowerCommand.includes('lights')) {
        const lightDevice = devices.find(d => d.type === 'light');
        if (lightDevice) {
          onDeviceControl(lightDevice.id, { isOn: true });
          action = 'Turned on lights';
          success = true;
        }
      } else if (lowerCommand.includes('turn off') && lowerCommand.includes('lights')) {
        const lightDevice = devices.find(d => d.type === 'light');
        if (lightDevice) {
          onDeviceControl(lightDevice.id, { isOn: false });
          action = 'Turned off lights';
          success = true;
        }
      } else if (lowerCommand.includes('ac') && lowerCommand.includes('degrees')) {
        const acDevice = devices.find(d => d.type === 'ac');
        const tempMatch = command.match(/(\d+)/);
        if (acDevice && tempMatch) {
          onDeviceControl(acDevice.id, { isOn: true, temperature: parseInt(tempMatch[1]) });
          action = `Set AC to ${tempMatch[1]}°C`;
          success = true;
        }
      } else if (lowerCommand.includes('turn on') && lowerCommand.includes('ac')) {
        const acDevice = devices.find(d => d.type === 'ac');
        if (acDevice) {
          onDeviceControl(acDevice.id, { isOn: true });
          action = 'Turned on AC';
          success = true;
        }
      } else if (lowerCommand.includes('turn off') && lowerCommand.includes('ac')) {
        const acDevice = devices.find(d => d.type === 'ac');
        if (acDevice) {
          onDeviceControl(acDevice.id, { isOn: false });
          action = 'Turned off AC';
          success = true;
        }
      } else if (lowerCommand.includes('heater') && lowerCommand.includes('degrees')) {
        const heaterDevice = devices.find(d => d.type === 'heater');
        const tempMatch = command.match(/(\d+)/);
        if (heaterDevice && tempMatch) {
          onDeviceControl(heaterDevice.id, { isOn: true, temperature: parseInt(tempMatch[1]) });
          action = `Set heater to ${tempMatch[1]}°C`;
          success = true;
        }
      } else if (lowerCommand.includes('turn on') && lowerCommand.includes('heater')) {
        const heaterDevice = devices.find(d => d.type === 'heater');
        if (heaterDevice) {
          onDeviceControl(heaterDevice.id, { isOn: true });
          action = 'Turned on heater';
          success = true;
        }
      } else if (lowerCommand.includes('turn off') && lowerCommand.includes('heater')) {
        const heaterDevice = devices.find(d => d.type === 'heater');
        if (heaterDevice) {
          onDeviceControl(heaterDevice.id, { isOn: false });
          action = 'Turned off heater';
          success = true;
        }
      } else if (lowerCommand.includes('fan')) {
        const fanDevice = devices.find(d => d.type === 'fan');
        if (fanDevice) {
          if (lowerCommand.includes('turn on')) {
            onDeviceControl(fanDevice.id, { isOn: true });
            action = 'Turned on fan';
            success = true;
          } else if (lowerCommand.includes('turn off')) {
            onDeviceControl(fanDevice.id, { isOn: false });
            action = 'Turned off fan';
            success = true;
          } else if (lowerCommand.includes('increase') || lowerCommand.includes('speed')) {
            onDeviceControl(fanDevice.id, { isOn: true, level: Math.min(100, fanDevice.level + 20) });
            action = 'Increased fan speed';
            success = true;
          }
        }
      }

      if (!success) {
        action = 'Command not recognized. Please try again.';
      }

      // Add to history
      setCommandHistory(prev => [{
        id: Date.now(),
        command,
        action,
        success,
        timestamp: new Date()
      }, ...prev.slice(0, 4)]);

      // Show toast notification
      toast({
        title: success ? "Voice Command Executed" : "Command Failed",
        description: action,
        variant: success ? "default" : "destructive",
      });

      setIsProcessing(false);
      setIsListening(false);
    }, 2000);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // Simulate voice recognition after 3 seconds
      setTimeout(() => {
        if (isListening) {
          const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
          processVoiceCommand(randomCommand);
        }
      }, 3000);
    }
  };

  const handleQuickCommand = (command) => {
    processVoiceCommand(command);
  };

  return (
    <div className="space-y-6">
      {/* Voice Control Interface */}
      <Card className="bg-gradient-to-r from-purple-50 to-white border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Volume2 className="text-purple-600" size={32} />
            Voice Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Voice Button */}
          <div className="text-center">
            <Button
              onClick={handleVoiceToggle}
              disabled={isProcessing}
              size="lg"
              className={`w-32 h-32 rounded-full text-white font-bold text-lg transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-lg shadow-red-200' 
                  : isProcessing
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-200'
              }`}
            >
              {isProcessing ? (
                <div className="flex flex-col items-center">
                  <Zap size={32} className="animate-spin mb-2" />
                  <span className="text-sm">Processing</span>
                </div>
              ) : isListening ? (
                <div className="flex flex-col items-center">
                  <Mic size={32} className="mb-2" />
                  <span className="text-sm">Listening...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <MicOff size={32} className="mb-2" />
                  <span className="text-sm">Press to Talk</span>
                </div>
              )}
            </Button>
          </div>

          {/* Status */}
          <div className="text-center">
            {isListening && (
              <Alert className="bg-blue-50 border-blue-200">
                <Mic className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Listening for your command... Speak clearly and wait for the beep.
                </AlertDescription>
              </Alert>
            )}
            {isProcessing && (
              <Alert className="bg-yellow-50 border-yellow-200">
                <Zap className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  Processing: "{lastCommand}"
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Quick Commands */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Voice Commands</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {voiceCommands.slice(0, 6).map((command, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  onClick={() => handleQuickCommand(command)}
                  disabled={isProcessing}
                  className="h-auto py-3 px-4 text-left justify-start whitespace-normal"
                >
                  <MessageSquare size={16} className="mr-2 flex-shrink-0 text-gray-500" />
                  <span className="text-sm">{command}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Command History */}
      <Card className="bg-white border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <MessageSquare className="text-blue-600" size={24} />
            Recent Commands
          </CardTitle>
        </CardHeader>
        <CardContent>
          {commandHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No voice commands yet. Try saying "Turn on lights" or press the microphone button.
            </p>
          ) : (
            <div className="space-y-3">
              {commandHistory.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  {item.success ? (
                    <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{item.command}</div>
                    <div className={`text-sm ${item.success ? 'text-green-700' : 'text-red-700'}`}>
                      {item.action}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <Badge variant={item.success ? "default" : "destructive"} className="ml-2">
                    {item.success ? "Success" : "Failed"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceControl;