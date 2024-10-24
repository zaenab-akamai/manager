import React from 'react';
import { useController } from 'react-hook-form';

import { ImageSelectv2 } from 'src/components/ImageSelectv2/ImageSelectv2';
import { Paper } from 'src/components/Paper';
import { Typography } from 'src/components/Typography';
import { useRestrictedGlobalGrantCheck } from 'src/hooks/useRestrictedGlobalGrantCheck';

import type { CreateLinodeRequest } from '@linode/api-v4';

export const OperatingSystems = () => {
  const { field, fieldState } = useController<CreateLinodeRequest>({
    name: 'image',
  });

  const isCreateLinodeRestricted = useRestrictedGlobalGrantCheck({
    globalGrantType: 'add_linodes',
  });

  return (
    <Paper>
      <Typography variant="h2">Choose an OS</Typography>
      <ImageSelectv2
        disabled={isCreateLinodeRestricted}
        errorText={fieldState.error?.message}
        label="Linux Distribution"
        onBlur={field.onBlur}
        onChange={(image) => field.onChange(image?.id ?? null)}
        placeholder="Choose a Linux distribution"
        value={field.value}
        variant="public"
      />
    </Paper>
  );
};
