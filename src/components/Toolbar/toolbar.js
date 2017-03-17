import React from 'react';
import {Toolbar as ToolbarMU, ToolbarGroup} from 'material-ui/Toolbar';
import {typography} from 'material-ui/styles';

const toolBarStyle = {
  backgroundColor: 'transparent; !important',
  title: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    color: '#17579c',
    marginBottom: 20
  }
};

const Toolbar = (props) => {
  return (
    <ToolbarMU style={ toolBarStyle }>
      <h3 style={ toolBarStyle.title }>{ props.title }</h3>
      {
        props.actionButtons && (<ToolbarGroup>{ props.actionButtons }</ToolbarGroup>)
      }
    </ToolbarMU>
  );
};

export default Toolbar;
