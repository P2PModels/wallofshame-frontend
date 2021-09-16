import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { shortenAddress } from '../../helpers/web3-helpers'
import { capitalizeFirstLetter } from '../../helpers/general-helpers'

import { Typography } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'

import Identicon from '../Identicon'

const RADIUS = 4

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  addressWrapper: {
    maxWidth: theme.spacing(8) * 2,
    letterSpacing: 1,
  },
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    paddingLeft: theme.spacing(1),
  },
  connectionMessage: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.success.main,
  },
}))

const IdentityBadge = ({ address, network }) => {
  const {
    wrapper,
    rightSection,
    addressWrapper,
    connectionMessage,
  } = useStyles({
    icon: true,
    radius: RADIUS,
  })
  // TODO: Check if address is a valid address
  const shortAddress = shortenAddress(address)
  return (
    <div className={wrapper}>
      <div>
        <Identicon address={address} scale={1.3} radius={RADIUS} />
      </div>
      <div className={rightSection}>
        <div className={addressWrapper}>
          <Typography variant="body1">{shortAddress}</Typography>
        </div>
        <div className={connectionMessage}>
          <DoneIcon fontSize="small" />
          <Typography variant="caption">
            {/* {hasNetworkMismatch ? 'Wrong network' : connectionMessage} */}
            Connected to {capitalizeFirstLetter(network)}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default IdentityBadge