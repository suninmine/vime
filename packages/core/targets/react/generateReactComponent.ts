import { ComponentCompilerMeta } from '@stencil/core/internal';
import { dashToPascalCase } from '../../src/utils/string';
import { fileName, generateImports, ignoreChecks } from '../targetHelpers';

export const generateReactComponent = (
  cmpMeta: ComponentCompilerMeta,
  components: ComponentCompilerMeta[],
) => {
  const name = fileName(cmpMeta);
  const displayName = dashToPascalCase(cmpMeta.tagName);
  const { tagName } = cmpMeta;

  return `
${ignoreChecks()}
import React, { ReactNode, HTMLAttributes } from 'react';
import { createComponent } from '../lib';
${generateImports(cmpMeta, components, ['JSX'])}

export interface ${name}Props extends JSX.${displayName}, HTMLAttributes<HTML${displayName}Element> {
  children?: ReactNode | ReactNode[]
};

export default createComponent<HTML${displayName}Element, ${name}Props>('${tagName}');
  `;
};
