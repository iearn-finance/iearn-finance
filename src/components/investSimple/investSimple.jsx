import { Button, Card, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Switch, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { Component } from "react";
import { withNamespaces } from 'react-i18next';
import { withRouter } from "react-router-dom";
import { BALANCES_RETURNED, CONNECTION_CONNECTED, CONNECTION_DISCONNECTED, ERROR, GET_BALANCES, INVEST_RETURNED, REDEEM_RETURNED } from '../../constants';
import Store from "../../stores";
import AppLayout from '../appLayout';
import Loader from '../loader';
import Snackbar from '../snackbar';
import UnlockModal from '../unlock/unlockModal.jsx';
import Asset from './asset';
import InvestAllModal from './investAllModal.jsx';



const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const styles = theme => ({
  // root: {
  //   flex: 1,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   maxWidth: '1200px',
  //   width: '100%',
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  investedContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    minWidth: '100%',
    [theme.breakpoints.up('md')]: {
      minWidth: '800px',
    }
  },
  balancesContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    padding: '12px 12px',
    position: 'relative',
  },
  connectContainer: {
    padding: '12px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '450px',
    [theme.breakpoints.up('md')]: {
      width: '450',
    }
  },
  intro: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  introCenter: {
    maxWidth: '500px',
    textAlign: 'center',
    display: 'flex',
    padding: '48px 0px'
  },
  introText: {
    paddingLeft: '20px'
  },
  actionButton: {
    '&:hover': {
      backgroundColor: "#2F80ED",
    },
    padding: '12px',
    backgroundColor: "#2F80ED",
    borderRadius: '1rem',
    border: '1px solid #E1E1E1',
    fontWeight: 500,
    [theme.breakpoints.up('md')]: {
      padding: '15px',
    }
  },
  overlay: {
    position: 'absolute',
    borderRadius: '10px',
    background: 'RGBA(200, 200, 200, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #aaa',
    cursor: 'pointer',

    right: '0px',
    top: '10px',
    height: '70px',
    width: '160px',
    [theme.breakpoints.up('md')]: {
      right: '0px',
      top: '10px',
      height: '90px',
      width: '210px',
    }
  },
  heading: {
    display: 'none',
    paddingTop: '12px',
    flex: 1,
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      paddingTop: '5px',
      display: 'block'
    }
  },
  headingName: {
    paddingTop: '5px',
    flex: 2,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    minWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      minWidth: 'auto',
    }
  },
  buttonText: {
    fontWeight: '700',
    color: 'white',
  },
  assetSummary: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap'
    }
  },
  assetIcon: {
    display: 'flex',
    alignItems: 'center',
    verticalAlign: 'middle',
    borderRadius: '20px',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    cursor: 'pointer',
    marginRight: '20px',
    [theme.breakpoints.up('sm')]: {
      height: '40px',
      width: '40px',
      marginRight: '24px',
    }
  },
  addressContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '100px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: '0.83rem',
    textOverflow:'ellipsis',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '0.75rem',
    height: 'max-content',
    [theme.breakpoints.up('md')]: {
      maxWidth: '130px',
      width: '100%'
    }
  },
  expansionPanel: {
    maxWidth: 'calc(100vw - 24px)',
    width: '100%'
  },
  versionToggle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tableHeadContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  investAllContainer: {
    paddingTop: '24px',
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  }
});

class InvestSimple extends Component {

  constructor(props) {
    super()

    this.state = {
      assets: store.getStore('assets'),
      account: store.getStore('account'),
      modalOpen: false,
      modalBuiltWithOpen: false,
      modalInvestAllOpen: false,
      snackbarType: null,
      snackbarMessage: null,
      hideV1: true
    }
  }
  componentWillMount() {
    emitter.on(INVEST_RETURNED, this.investReturned);
    emitter.on(REDEEM_RETURNED, this.redeemReturned);
    emitter.on(ERROR, this.errorReturned);
    emitter.on(BALANCES_RETURNED, this.balancesReturned);
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected);

  }

  componentWillUnmount() {
    emitter.removeListener(INVEST_RETURNED, this.investReturned);
    emitter.removeListener(REDEEM_RETURNED, this.redeemReturned);
    emitter.removeListener(ERROR, this.errorReturned);
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected);

    emitter.removeListener(BALANCES_RETURNED, this.balancesReturned);
  };

  refresh() {
    dispatcher.dispatch({ type: GET_BALANCES, content: {} })
  }

  balancesReturned = (balances) => {
    this.setState({ assets: store.getStore('assets') })
    setTimeout(this.refresh,5000);
  };

  connectionConnected = () => {
    this.setState({ account: store.getStore('account') })

    dispatcher.dispatch({ type: GET_BALANCES, content: {} })

    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: 'Wallet succesfully connected.', snackbarType: 'Info' }
      that.setState(snackbarObj)
    })
  };

  connectionDisconnected = () => {
    this.setState({ account: store.getStore('account') })
  }

  errorReturned = (error) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null }
    this.setState(snackbarObj)
    this.setState({ loading: false })
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: error.toString(), snackbarType: 'Error' }
      that.setState(snackbarObj)
    })
  };

  investReturned = (txHash) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null }
    this.setState(snackbarObj)
    this.setState({ loading: false })
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: txHash, snackbarType: 'Hash' }
      that.setState(snackbarObj)
    })
  };

  redeemReturned = (txHash) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null }
    this.setState(snackbarObj)
    this.setState({ loading: false })
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: txHash, snackbarType: 'Hash' }
      that.setState(snackbarObj)
    })
  };

  render() {
    const { classes, t } = this.props;
    const {
      loading,
      account,
      modalOpen,
      modalBuiltWithOpen,
      modalInvestAllOpen,
      snackbarMessage,
      hideV1,
    } = this.state
    var address = null;
    if (account.address) {
      address = account.address.substring(0,6)+'...'+account.address.substring(account.address.length-4,account.address.length)
    }
    return (
      <AppLayout>
        <div className={classes.investedContainer}>
          { account.address &&
            <div className={ classes.intro }>
              { account.address && <div className={ classes.versionToggle }>
                <Switch
                  id='hideV1'
                  checked={ hideV1 }
                  onChange={ this.onChange }
                  value={ 'hideV1' } />
                <Typography variant={ 'h6'}>{ t('InvestSimple.Show') }</Typography>
              </div> }
              <Typography variant='h2' className={ classes.introText }>{ t('InvestSimple.Intro') }</Typography>
              <Card className={ classes.addressContainer } onClick={this.overlayClicked}>
                <Typography variant={ 'h5'} noWrap>{ address }</Typography>
                <div style={{ background: '#DC6BE5', opacity: '1', borderRadius: '10px', width: '10px', height: '10px', marginRight: '3px', marginTop:'3px', marginLeft:'6px' }}></div>
              </Card>
            </div>
          }
          { !account.address &&
            <div className={ classes.introCenter }>
              <Typography variant='h2'>{ t('InvestSimple.Intro') }</Typography>
            </div>
          }

          {!account.address &&
            <div className={ classes.connectContainer }>
              <Button
                className={ classes.actionButton }
                variant="outlined"
                color="primary"
                disabled={ loading }
                onClick={ this.overlayClicked }
                >
                <Typography className={ classes.buttonText } variant={ 'h5'}>{ t('InvestSimple.Connect') }</Typography>
              </Button>
            </div>
          }
          { account.address && this.renderAssetBlocks() }
          {/* account.address && <div className={ classes.investAllContainer }>
            <Button
              className={ classes.actionButton }
              variant="outlined"
              color="primary"
              disabled={ loading }
              onClick={ this.investAllClicked }
              >
              <Typography className={ classes.buttonText } variant={ 'h5'}>{ 'Earn All' }</Typography>
            </Button>
          </div> */}
        </div>
        { loading && <Loader /> }
        { modalOpen && this.renderModal() }
        { modalInvestAllOpen && this.renderInvestAllModal() }
        { snackbarMessage && this.renderSnackbar() }
      </AppLayout>
    )
  };

  onChange = (event) => {
    let val = []
    val[event.target.id] = event.target.checked
    this.setState(val)
  };

  renderAssetBlocks = () => {
    const { assets, expanded, hideV1 } = this.state
    const { classes, t } = this.props
    const width = window.innerWidth

    return assets.filter((asset) => {
      return (hideV1 === true || asset.version !== 1)
    }).filter((asset) => {
      return asset.version == 2 || (asset.version == 1 && (asset.investedBalance).toFixed(4) > 0)
    }).filter((asset) => {
      return !(asset.symbol == "iDAI")
    }).map((asset) => {
      return (
        <ExpansionPanel className={ classes.expansionPanel } square key={ asset.id+"_expand" } expanded={ expanded === asset.id} onChange={ () => { this.handleChange(asset.id) } }>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className={ classes.assetSummary }>
              <div className={classes.headingName}>
                <div className={ classes.assetIcon }>
                  <img
                    alt=""
                    src={ require('../../assets/'+asset.symbol+'-logo.png') }
                    height={ width > 600 ? '40px' : '30px'}
                    style={asset.disabled?{filter:'grayscale(100%)'}:{}}
                  />
                </div>
                <div>
                  <Typography variant={ 'h3' }>{ asset.name }</Typography>
                  <Typography variant={ 'h5' }>{ asset.version == 1?asset.description+' - v'+asset.version+'':asset.description }</Typography>
                </div>
              </div>
              <div className={classes.heading}>
                <Typography variant={ 'h3' }>{ (asset.maxApr*100).toFixed(4) + ' %' }</Typography>
                <Typography variant={ 'h5' }>{ t('InvestSimple.InterestRate') }</Typography>
              </div>
              <div className={classes.heading}>
                <Typography variant={ 'h3' }>{(asset.balance).toFixed(4)+' '+( asset.tokenSymbol ? asset.tokenSymbol : asset.symbol )}</Typography>
                <Typography variant={ 'h5' }>{ t('InvestSimple.AvailableBalance') }</Typography>
              </div>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Asset asset={ asset } startLoading={ this.startLoading } />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    })
  }

  handleChange = (id) => {
    this.setState({ expanded: this.state.expanded === id ? null : id })
  }

  startLoading = () => {
    this.setState({ loading: true })
  }

  renderSnackbar = () => {
    var {
      snackbarType,
      snackbarMessage
    } = this.state
    return <Snackbar type={ snackbarType } message={ snackbarMessage } open={true}/>
  };

  renderModal = () => {
    return (
      <UnlockModal closeModal={ this.closeModal } modalOpen={ this.state.modalOpen } />
    )
  }

  renderInvestAllModal = () => {
    return (
      <InvestAllModal closeModal={ this.closeInvestAllModal } modalOpen={ this.state.modalInvestAllOpen } assets={ this.state.assets } />
    )
  }

  overlayClicked = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  investAllClicked = () => {
    this.setState({ modalInvestAllOpen: true })
  }

  closeInvestAllModal = () => {
    this.setState({ modalInvestAllOpen: false })
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(InvestSimple)));
