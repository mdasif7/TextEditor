import React, { Component, Fragment } from "react";
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Icon from 'react-icons-kit';

import {ItalicMark, FormatToolBar, BoldMark} from './index';
import { bold } from "react-icons-kit/feather/bold";
import { italic } from "react-icons-kit/feather/italic";
import { code } from "react-icons-kit/feather/code";
import { list } from "react-icons-kit/feather/list";
import { underline } from "react-icons-kit/feather/underline";



const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'Edit this Text',
                            },
                        ],
                    }
                ],
            },
        ],
    },
})

export default class TextEditor extends Component {
    state = {
        value: initialValue,
    }

    onChange = ({ value }) => {
        this.setState({ value })
    }
    onKeyDown = (e, change) => {
        console.log(e.key);

        if (!e.ctrlKey) {
            // use !e ctrlKey if u want to use ctrl key
            //e.altKey
            return
        }
        e.preventDefault()

        switch (e.key) {
            case 'b': {
                change.toggleMark('bold');
                return true;
            }
            case 'i': {
                change.toggleMark('italic');
                return true;
            }
            case 'c': {
                change.toggleMark('code');
                return true;
            }
            case 'l': {
                change.toggleMark('list');
                return true;
            }
            case 'u': {
                change.toggleMark('underline');
                return true;
            }
            default: {
                return;
            }

        }
    }

    renderMark = props => {
        switch (props.mark.type) {
            case 'bold':
                return <BoldMark {...props} />
            case 'italic':
                return <ItalicMark {...props} />
            case 'code':
                return <code {...props.attributes}>{props.children}</code>
            case 'list':
                return(
                    <ul {...props.attributes}>
                        <li>{props.children}</li>
                    </ul> 
                ); 
            case 'underline':
                return <u {...props.attributes}>{props.children}</u>
            default: return;
        }
    }
    onMarkClick= (e, type)=>{
        e.preventDefault();
        const {value}=this.state;
        const change = value.change().toggleMark(type);
        this.onChange(change);
    };

    render() {
        return (
            <Fragment>
                <h4>
                    Text Editor using React and slate
                </h4>

                <FormatToolBar>
                    <button 
                    onPointerDown={(e)=> this.onMarkClick(e, 'bold')}
                    className='tooltip-icon-button'>
                        <Icon icon={bold} />
                    </button>
                    <button 
                        onPointerDown={(e)=> this.onMarkClick(e, 'italic')}
                        className='tooltip-icon-button'>
                        <Icon icon={italic} />
                    </button>
                    <button 
                    onPointerDown={(e)=> this.onMarkClick(e, 'code')}
                    className='tooltip-icon-button'>
                        <Icon icon={code} />
                    </button>
                    <button 
                    onPointerDown={(e)=> this.onMarkClick(e, 'list')}
                    className='tooltip-icon-button'>
                        <Icon icon={list} />
                    </button>
                    <button 
                    onPointerDown={(e)=> this.onMarkClick(e, 'underline')}
                    className='tooltip-icon-button'>
                        <Icon icon={underline} />
                    </button>
                </FormatToolBar>
                <Editor value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderMark={this.renderMark} />
            </Fragment>
        )
    }

} 