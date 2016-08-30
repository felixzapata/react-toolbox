import React, { Component, PropTypes } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import { DIALOG } from '../identifiers.js';
import Button from '../button/Button.js';
import Overlay from '../overlay/Overlay.js';


var factory = function factory(Overlay, Button) {

  class Dialog extends Component {
    static propTypes = {
      actions: PropTypes.array,
      active: PropTypes.bool,
      children: PropTypes.node,
      className: PropTypes.string,
      onEscKeyDown: PropTypes.func,
      onOverlayClick: PropTypes.func,
      onOverlayMouseDown: PropTypes.func,
      onOverlayMouseMove: PropTypes.func,
      onOverlayMouseUp: PropTypes.func,
      theme: PropTypes.shape({
        active: PropTypes.string,
        body: PropTypes.string,
        button: PropTypes.string,
        dialog: PropTypes.string,
        navigation: PropTypes.string,
        title: PropTypes.string
      }),
      title: PropTypes.string,
      type: PropTypes.string
    };

    static defaultProps = {
      actions: [],
      active: false,
      type: 'normal'
    };

    setTabIndex(obj, tabIdx) {
      // Elements that can be focused even if they have [disabled] attribute.
      const FOCUSABLE_WITH_DISABLED = [
          'a[href]',
          'area[href]',
          'iframe',
          '[tabindex]',
          '[contentEditable=true]'
        ];
      // Elements that cannot be focused if they have [disabled] attribute.
      const FOCUSABLE_WITHOUT_DISABLED = [
          'input',
          'select',
          'textarea',
          'button'
        ];
      // Discard elements with tabindex=-1 (makes them not focusable).
      const selector = FOCUSABLE_WITH_DISABLED.join(':not([tabindex="-1"]),') +
        ':not([tabindex="-1"]),' +
        FOCUSABLE_WITHOUT_DISABLED.join(':not([disabled]):not([tabindex="-1"]),') +
        ':not([disabled]):not([tabindex="-1"])';
      const focusables = Array.prototype.slice.call(obj.querySelectorAll(selector));
      const focusablesInDialog = Array.prototype.slice.call(this.refs.dialog.querySelectorAll(selector)); 
      const len = focusables.length;

      var filtered = focusables.filter(function(value){
        return !focusablesInDialog.includes(value);
      });

      for(var i = 0; i < filtered.length; i++) {
        filtered[i].setAttribute('tabindex', tabIdx);
      }
    }

    componentDidMount () {
      console.log('componentDidMount');
    }

    componentWillUpdate (nextProps) {

      if (nextProps.active && !this.props.active) {
        this.refs.dialog.focus();
        this.setTabIndex(document.body, -1);
      } 
      if (!nextProps.active && this.props.active) {
        this.setTabIndex(document.body, 0);
      } 

    }

    componentDidUpdate () {
      console.log('componentDidUpdate');
    }

    componentWillUnmount () {
      console.log('componentWillUnmount');
    }

    render () {
      const actions = this.props.actions.map((action, idx) => {
        const className = classnames(this.props.theme.button, {[action.className]: action.className});
        return <Button key={idx} {...action} className={className} />;
      });

      const className = classnames([this.props.theme.dialog, this.props.theme[this.props.type]], {
        [this.props.theme.active]: this.props.active
      }, this.props.className);

      return (
        <Overlay
          active={this.props.active}
          onClick={this.props.onOverlayClick}
          onEscKeyDown={this.props.onEscKeyDown}
          onMouseDown={this.props.onOverlayMouseDown}
          onMouseMove={this.props.onOverlayMouseMove}
          onMouseUp={this.props.onOverlayMouseUp}
        >
          <div data-react-toolbox='dialog' ref='dialog' role='dialog' tabIndex='-1' className={className}>
            <section role='body' className={this.props.theme.body}>
              {this.props.title ? <h6 className={this.props.theme.title}>{this.props.title}</h6> : null}
              {this.props.children}
            </section>
            {actions.length
              ? <nav role='navigation' className={this.props.theme.navigation}>
                  {actions}
                </nav>
              : null
            }
          </div>
        </Overlay>
      );
    }

  }

  return Dialog;

}

const Dialog = factory(Overlay, Button);
export default themr(DIALOG)(Dialog);
export { Dialog };
export { factory as dialogFactory };


