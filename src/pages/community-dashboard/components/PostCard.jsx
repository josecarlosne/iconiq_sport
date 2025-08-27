import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PostCard = ({ post, onLike, onComment, onShare }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [likeCount, setLikeCount] = useState(post?.likes || 0);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
    onLike?.(post?.id, newLikedState);
  };

  const handleComment = () => {
    if (newComment?.trim()) {
      onComment?.(post?.id, newComment);
      setNewComment('');
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'training': return 'Dumbbell';
      case 'achievement': return 'Trophy';
      case 'event': return 'Calendar';
      case 'sponsor': return 'Handshake';
      default: return 'MessageCircle';
    }
  };

  const getPostTypeColor = (type) => {
    switch (type) {
      case 'training': return 'text-blue-500';
      case 'achievement': return 'text-yellow-500';
      case 'event': return 'text-green-500';
      case 'sponsor': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-card border border-border overflow-hidden transition-smooth hover:shadow-modal">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start space-x-3">
          <Image
            src={post?.author?.avatar}
            alt={post?.author?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-foreground truncate">{post?.author?.name}</h3>
              {post?.author?.verified && (
                <Icon name="BadgeCheck" size={16} className="text-blue-500 flex-shrink-0" />
              )}
              <div className={`flex items-center space-x-1 ${getPostTypeColor(post?.type)}`}>
                <Icon name={getPostTypeIcon(post?.type)} size={14} />
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{post?.author?.role}</span>
              <span>•</span>
              <span>{formatTimeAgo(post?.timestamp)}</span>
              {post?.location && (
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{post?.location}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-foreground whitespace-pre-line">{post?.content}</p>
        {post?.hashtags && post?.hashtags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post?.hashtags?.map((tag, index) => (
              <span key={index} className="text-accent hover:text-accent/80 cursor-pointer text-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* Media */}
      {post?.media && (
        <div className="px-4 pb-3">
          {post?.media?.type === 'image' && (
            <Image
              src={post?.media?.url}
              alt="Post media"
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
          {post?.media?.type === 'video' && (
            <div className="relative w-full h-64 bg-muted rounded-lg flex items-center justify-center">
              <Button variant="ghost" size="icon" className="w-16 h-16 bg-black/50 hover:bg-black/70 text-white rounded-full">
                <Icon name="Play" size={24} />
              </Button>
            </div>
          )}
        </div>
      )}
      {/* Engagement Stats */}
      {(likeCount > 0 || post?.comments > 0 || post?.shares > 0) && (
        <div className="px-4 pb-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              {likeCount > 0 && (
                <span className="flex items-center space-x-1">
                  <div className="flex -space-x-1">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <Icon name="Heart" size={12} color="white" />
                    </div>
                  </div>
                  <span>{likeCount}</span>
                </span>
              )}
              {post?.comments > 0 && <span>{post?.comments} comentarios</span>}
            </div>
            {post?.shares > 0 && <span>{post?.shares} compartidos</span>}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
          >
            <Icon name={isLiked ? "Heart" : "Heart"} size={18} fill={isLiked ? "currentColor" : "none"} />
            <span>Me gusta</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-muted-foreground"
          >
            <Icon name="MessageCircle" size={18} />
            <span>Comentar</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare?.(post?.id)}
            className="flex items-center space-x-2 text-muted-foreground"
          >
            <Icon name="Share" size={18} />
            <span>Compartir</span>
          </Button>
        </div>
      </div>
      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-border bg-muted/30">
          <div className="p-4 space-y-3">
            {post?.recentComments?.map((comment, index) => (
              <div key={index} className="flex space-x-3">
                <Image
                  src={comment?.author?.avatar}
                  alt={comment?.author?.name}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="bg-card rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{comment?.author?.name}</span>
                      <span className="text-xs text-muted-foreground">{formatTimeAgo(comment?.timestamp)}</span>
                    </div>
                    <p className="text-sm text-foreground">{comment?.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add Comment */}
            <div className="flex space-x-3 pt-2">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                alt="Tu avatar"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  placeholder="Escribe un comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e?.target?.value)}
                  className="flex-1 bg-card border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  onKeyPress={(e) => e?.key === 'Enter' && handleComment()}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleComment}
                  disabled={!newComment?.trim()}
                  className="flex-shrink-0"
                >
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;