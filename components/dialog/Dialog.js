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
          <div data-react-toolbox='dialog' role='dialog' tabIndex='-1' className={className}>
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


