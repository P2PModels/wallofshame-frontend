import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  CircularProgress,
  Typography,
} from '@material-ui/core'
import ActionDialog from '../Shared/ActionDialog'

import { connectorsByName } from '../../wallet-providers'

const useStyles = makeStyles(theme => ({
  providerItem: {
    cursor: ({ activating }) => (activating ? '' : 'pointer'),
    padding: `${theme.spacing(1)}px`,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    opacity: ({ activating }) => (activating ? '0.5' : ''),
    '&:hover': {
      backgroundColor: ({ activating }) => (activating ? '' : '#F6F5F5'),
      transition: 'background-color 0.3s',
    },
  },
  providerLogo: {
    width: '30%',
  },
  activatingProgress: {
    position: 'absolute',
    top: '50%',
    left: '45%',
  },
}))

const ProvidersModal = ({ open, activating, onSelect, onClose }) => {
  const { activatingProgress } = useStyles()

  return (
    <div>
      <ActionDialog
          open={open}
          onClose={onClose}
          title="Select an account provider"
          content={
            <Grid container alignItems="center" alignContent="center">
              {Object.keys(connectorsByName).map(key => {
                const { name, logo, connector } = connectorsByName[key]
                return (
                  <div key={key}>
                    <ProviderItem
                      name={name}
                      logo={logo}
                      activating={activating}
                      onSelect={() => onSelect(connector)}
                      />
                    {activating && (
                      <CircularProgress className={activatingProgress} />
                      )}
                  </div>
                )
              })}
            </Grid> 
          }
      />
    </div>
  )
}

const ProviderItem = ({ logo, name, activating, onSelect }) => {
  const { providerItem, providerLogo } = useStyles({ activating })

  return (
    <Grid item className={providerItem} onClick={onSelect}>
      <img className={providerLogo} src={logo} />
      <Typography color="primary" variant="h5">
        {name}
      </Typography>
      Connect with your {name} account.
    </Grid>
  )
}

export default ProvidersModal