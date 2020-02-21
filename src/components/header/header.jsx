import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/icons';
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { CONNECT_METAMASK_PASSIVE, METAMASK_CONNECTED } from '../../constants';
import Store from "../../stores";
import { colors } from '../../theme';
import UnlockModal from '../unlock/unlockModal.jsx';


const dispatcher = Store.dispatcher
const emitter = Store.emitter
const store = Store.store

const drawerWidth = 240

const styles = theme => ({
  brandingContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center'
  },
  brandingName: {
    paddingLeft: '12px',
    cursor: 'pointer'
  },
  brandingIcon: {
    border: '1px solid ' + colors.white,
    cursor: 'pointer'
  },
  linksContainer: {
    flex: 1,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      maxWidth: '500px',
      listStyleType: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'space-evenly'
    }
  },
  linksContainerMobile: {
    position: 'absolute',
    top: '66px',
    left: '0px',
    right: '0px',
    backgroundColor: '#fff',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 99,
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  link: {
    cursor: 'pointer',
    padding: '6px',
    borderBottom: '2px solid rgba(0, 0, 0, 0)',
    width: 'fit-content',
    '&:hover': {
      borderBottom: '2px solid #aaa'
    }
  },
  link_active: {
    borderBottom: '2px solid ' + colors.blue,
    [theme.breakpoints.up('md')]: {
      borderBottom: '2px solid ' + colors.white
    }
  },
  addressContainer: {
    maxWidth: '100px',
    padding: '6px 12px',
    background: '#fbfbfb',
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      maxWidth: '300px'
    }
  },
  menuIconContainer: {
    padding: '0px 0px 0px 6px',
    display: 'flex',
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      display: 'none',
      padding: '0px 20px'
    }
  },
  menuIcon: {
    color: colors.white
  }
})

class Header extends Component {
  constructor(props) {
    super();

    dispatcher.dispatch({ type: CONNECT_METAMASK_PASSIVE, content: {} })

    this.state = {
      address: null,
      modalOpen: false,
      menuOpen: false
    }
  }

  componentWillMount() {
    emitter.on(METAMASK_CONNECTED, this.metamaskUnlocked);

    this.menuRef = React.createRef();
    this.menuOpenRef = React.createRef();
    document.addEventListener("mousedown", this.clickListener);
  };

  componentWillUnmount() {
    emitter.removeListener(METAMASK_CONNECTED, this.metamaskUnlocked);
  };

  clickListener = (event) => {
    if (!this.menuRef.current || this.menuRef.current.contains(event.target) || this.menuOpenRef.current.contains(event.target)) {
      return;
    } else {
      this.closeMenu()
    }
  };

  metamaskUnlocked = () => {
    const account = store.getStore('account')
    this.setState({ address: account.address })
  };

  render() {
    const { classes, location } = this.props;
    const {
      modalOpen,
      address,
      menuOpen
    } = this.state

    return (
      <>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
            <Button>Login</Button>
          </Toolbar>
        </AppBar>

      </>
      // <div className={ classes.root }>
      //   <div className={ classes.header }>
      //     <div className={ classes.brandingContainer }>
      //       <div className={ classes.brandingIcon } onClick={ this.navigateHome }><Typography variant={ 'body1' } color='secondary'>icon</Typography></div>
      //       <div className={ classes.brandingName } onClick={ this.navigateHome }>
      //         <Typography variant={ 'h1' } color='secondary'>iearn</Typography>
      //       </div>
      //     </div>
      //     <div className={ classes.linksContainer }>
      //       <div className={ classes.link }><Typography variant={ 'body1' } color='secondary'>iswap</Typography></div>
      //       <div className={ `${classes.link} ${classes.link_active}` }><Typography variant={ 'body1' } color='secondary'>iearn</Typography></div>
      //       <div className={ classes.link }><Typography variant={ 'body1' } color='secondary'>ireward</Typography></div>
      //       <div className={ classes.link }><Typography variant={ 'body1' } color='secondary'>iam</Typography></div>
      //       <div className={ classes.link }><Typography variant={ 'body1' } color='secondary'>irefer</Typography></div>
      //       <div className={ classes.link }><Typography variant={ 'body1' } color='secondary'>faq</Typography></div>
      //       <div className={ classes.link }><Typography variant={ 'body1' } color='secondary'>what</Typography></div>
      //     </div>
      //     { address && <div className={ classes.addressContainer } onClick={this.onAddressClick}>
      //       <Typography variant={ 'h2' } noWrap>{ address }</Typography>
      //     </div>}
      //     { !address &&  <div className={ classes.addressContainer } onClick={this.onAddressClick}>
      //       <Typography variant={ 'h2' } noWrap>Connect Wallet</Typography>
      //     </div> }
      //     <div className={ classes.menuIconContainer } ref={this.menuOpenRef}>
      //       <Menu onClick={ !menuOpen ? this.toggleMenu : this.closeMenu } className={ classes.menuIcon } />
      //     </div>
      //     {
      //       menuOpen && (<div className={ classes.linksContainerMobile } ref={this.menuRef} >
      //         <div className={ classes.link }><Typography variant={ 'body1' }>iswap</Typography></div>
      //         <div className={ `${classes.link} ${classes.link_active}` }><Typography variant={ 'body1' }>iearn</Typography></div>
      //         <div className={ classes.link }><Typography variant={ 'body1' }>ireward</Typography></div>
      //         <div className={ classes.link }><Typography variant={ 'body1' }>iam</Typography></div>
      //         <div className={ classes.link }><Typography variant={ 'body1' }>irefer</Typography></div>
      //         <div className={ classes.link }><Typography variant={ 'body1' }>faq</Typography></div>
      //         <div className={ classes.link }><Typography variant={ 'body1' }>what</Typography></div>
      //       </div>)
      //     }
      //   </div>

      //   { modalOpen && this.renderModal() }
      // </div>
    )
  };

  navigateHome = () => {
    this.props.history.push('/')
  }

  onAddressClick = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  renderModal = () => {
    return (
      <UnlockModal closeModal={ this.closeModal } />
    )
  }

  closeMenu = () => {
    console.log('closing menu')
    this.setState({ menuOpen: false })
  }

  toggleMenu = () => {
    console.log('opening menu')
    this.setState({ menuOpen: true })
  }
}

export default withRouter(withStyles(styles)(Header));
