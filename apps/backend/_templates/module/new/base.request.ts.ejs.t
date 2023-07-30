---
to: src/<%= moduleName %>/<%= moduleName %>.base.request.ts
---

<% function toCamelCase(str) {
  return str.replace(/_./g, function(match) {
    return match.charAt(1).toUpperCase();
  }).replace(/^./, function(match) {
    return match.toUpperCase();
  });
} %>

<% const className = toCamelCase(moduleName) %>


import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { UnixTimestamp } from '../base/base.request';


export abstract class <%= className %> extends UnixTimestamp {
  @ApiProperty({ required: true })
  @IsString()
  id: string;

<% for (const column of columns) { -%>
  @ApiProperty({ required: true })
  @IsString()
  <%= column %>: string;

<% } -%>
}
