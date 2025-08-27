import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, change, changeType, icon, color = 'accent' }) => {
  const getColorClasses = (colorName) => {
    const colors = {
      accent: 'text-accent bg-accent/10',
      success: 'text-success bg-success/10',
      warning: 'text-warning bg-warning/10',
      error: 'text-error bg-error/10'
    };
    return colors?.[colorName] || colors?.accent;
  };

  const getChangeColor = (type) => {
    return type === 'positive' ? 'text-success' : type === 'negative' ? 'text-error' : 'text-muted-foreground';
  };

  const getChangeIcon = (type) => {
    return type === 'positive' ? 'TrendingUp' : type === 'negative' ? 'TrendingDown' : 'Minus';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover-scale transition-smooth">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {change && (
            <div className={`flex items-center space-x-1 mt-2 ${getChangeColor(changeType)}`}>
              <Icon name={getChangeIcon(changeType)} size={14} />
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;