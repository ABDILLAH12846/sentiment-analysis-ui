'use client';

import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import Entity from '@ant-design/cssinjs/es/Cache';
import { useServerInsertedHTML } from 'next/navigation';

const StyledComponentsRegistry = ({ children }) => {
  const cache = React.useMemo(() => createCache(), []);
  const isServerInserted = React.useRef(false);
  useServerInsertedHTML(() => {
    // avoid duplicate css insert
    if (isServerInserted.current) {
      return;
    }
    isServerInserted.current = true;
    return React.createElement('style', {
      id: 'antd',
      dangerouslySetInnerHTML: { __html: extractStyle(cache, true) },
    });
  });
  return React.createElement(StyleProvider, { cache: cache }, children);
};

export default StyledComponentsRegistry;
