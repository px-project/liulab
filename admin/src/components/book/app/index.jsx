
import React, {Component} from 'react';

export class BookAppComponent extends Component {
    render (){
        return(<div className="book-app">{React.cloneElement(this.props.children, this.props)}</div>);
    } 
}