import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function ProductBar({count}) {
  return (
    <Grid container wrap="wrap" gap={4}>
      {Array.from(new Array(count)).map((_, index) => (
        <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton />
            <Skeleton width="80%" />
            <Skeleton width="70%" />
            <Skeleton width="60%" />
          </Box>
        </Box>
      ))}
    </Grid>
  );
}


