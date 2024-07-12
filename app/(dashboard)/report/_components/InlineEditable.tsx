import React, { useState, useEffect, useRef } from 'react';

interface InlineEditableProps {
  value: string;
  onChange: (value: string) => void;
  editable: boolean;
  multiline?: boolean;
}

const InlineEditable: React.FC<InlineEditableProps> = ({ value, onChange, editable, multiline = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && editableRef.current) {
      editableRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    onChange(editedValue);
  };

  if (!editable) {
    return multiline ? <div>{value}</div> : <span>{value}</span>;
  }

  return (
    <div
      ref={editableRef}
      contentEditable={editable}
      onFocus={() => setIsEditing(true)}
      onBlur={handleBlur}
      onInput={(e) => setEditedValue(e.currentTarget.textContent || '')}
      suppressContentEditableWarning={true}
      style={{
        minHeight: multiline ? '100px' : 'auto',
        padding: '4px',
        border: isEditing ? '1px solid #ccc' : 'none',
        borderRadius: '4px',
        outline: 'none',
        whiteSpace: multiline ? 'pre-wrap' : 'nowrap',
      }}
    >
      {value}
    </div>
  );
};

export default InlineEditable;