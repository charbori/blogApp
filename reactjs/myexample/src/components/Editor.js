import React, { Component } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { Config } from '@/admin/config';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Editor extends React.Component {
    constructor(props) {
      super(props)
      this.state = { text: '' } // You can also pass a Quill Delta here
      this.handleChange = this.handleChange.bind(this)
    }
   
    handleChange(value) {
      this.setState({ text: value })
    }
   
    render() {
      return (
        <ReactQuill value={this.state.text}
                    onChange={this.handleChange} />
      )
    }
  }
export default Editor;