"use client";

import React from 'react';
import { BusInfo, BusStop } from '@/lib/busData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RouteDetailsProps {
  busInfo: BusInfo;
}

const RouteDetails: React.FC<RouteDetailsProps> = ({ busInfo }) => {
  return (
    <div className="space-y-6">
      {/* Route Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-foreground">Route Overview</h3>
          <Badge variant="secondary">
            {busInfo.busNumber}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Distance</p>
            <p className="text-lg font-semibold text-foreground">{busInfo.totalDistance}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Duration</p>
            <p className="text-lg font-semibold text-foreground">{busInfo.estimatedDuration}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Fare</p>
            <p className="text-lg font-semibold text-green-600 dark:text-green-400">{busInfo.fare}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Stops</p>
            <p className="text-lg font-semibold text-foreground">{busInfo.stops.length}</p>
          </div>
        </div>
      </Card>

      {/* Detailed Route with All Stops */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">
          Complete Route: {busInfo.startPoint} → {busInfo.endPoint}
        </h3>
        
        <div className="relative">
          {/* Route Line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-blue-200 dark:bg-blue-700"></div>
          
          {/* Stops List */}
          <div className="space-y-4">
            {busInfo.stops.map((stop, index) => (
              <div key={index} className="relative flex items-center space-x-4">
                {/* Stop Marker */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 ${
                  index === 0 
                    ? 'bg-green-500 border-green-200' 
                    : index === busInfo.stops.length - 1 
                    ? 'bg-red-500 border-red-200' 
                    : 'bg-blue-500 border-blue-200'
                }`}>
                  <span className="text-white font-bold text-sm">
                    {index === 0 ? 'S' : index === busInfo.stops.length - 1 ? 'E' : index}
                  </span>
                </div>
                
                {/* Stop Information */}
                <div className="flex-1 bg-card p-4 rounded-lg border border-border shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{stop.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Coordinates: {stop.lat.toFixed(4)}, {stop.lng.toFixed(4)}
                      </p>
                      {index === 0 && (
                        <Badge variant="outline" className="mt-1 text-green-600 dark:text-green-400 border-green-200 dark:border-green-700">
                          Starting Point
                        </Badge>
                      )}
                      {index === busInfo.stops.length - 1 && (
                        <Badge variant="outline" className="mt-1 text-red-600 dark:text-red-400 border-red-200 dark:border-red-700">
                          Final Destination
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {stop.estimatedTime}
                      </p>
                      <p className="text-xs text-muted-foreground">from start</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Route Instructions */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Route Instructions</h3>
        <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <p>• Board the bus at <strong>{busInfo.startPoint}</strong></p>
          <p>• The bus will make {busInfo.stops.length - 2} intermediate stops</p>
          <p>• Total journey time: <strong>{busInfo.estimatedDuration}</strong></p>
          <p>• Fare: <strong>{busInfo.fare}</strong> (exact change recommended)</p>
          <p>• Final destination: <strong>{busInfo.endPoint}</strong></p>
        </div>
      </Card>
    </div>
  );
};

export default RouteDetails;
