import React from 'react';

const LoadingSkeleton = ({ viewMode = 'grid' }) => {
  const SkeletonCard = () => (
    <div className="bg-card rounded-lg shadow-card overflow-hidden animate-pulse">
      <div className="h-48 bg-muted"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded w-1/2"></div>
          <div className="h-3 bg-muted rounded w-2/3"></div>
          <div className="h-3 bg-muted rounded w-1/3"></div>
        </div>
        <div className="h-8 bg-muted rounded w-full"></div>
        <div className="flex justify-between">
          <div className="h-6 bg-muted rounded w-20"></div>
          <div className="h-8 bg-muted rounded w-24"></div>
        </div>
      </div>
    </div>
  );

  const SkeletonListItem = () => (
    <div className="bg-card rounded-lg shadow-card border border-border animate-pulse">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-48 h-48 bg-muted"></div>
        <div className="flex-1 p-6 space-y-4">
          <div className="h-6 bg-muted rounded w-3/4"></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded"></div>
            <div className="h-3 bg-muted rounded w-5/6"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-6 bg-muted rounded w-20"></div>
            <div className="flex space-x-2">
              <div className="h-8 bg-muted rounded w-24"></div>
              <div className="h-8 bg-muted rounded w-28"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 })?.map((_, index) => (
          <SkeletonListItem key={index} />
        ))}
      </div>
    );
  }

  if (viewMode === 'map') {
    return (
      <div className="w-full h-full bg-muted rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-muted-foreground">Cargando mapa...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 })?.map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;