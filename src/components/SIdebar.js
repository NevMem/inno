import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Sidebar extends Component {
    render() {
        return (
            <div style={{position: "fixed", top: "120px", left: "30px"}}>
                <div>
                    <Link className="sidebar-link" to="/search">Поиск</Link>
                </div>
                <div>
                    <Link className="sidebar-link" to="/userData">Мои данные</Link>
                </div>
                <div>
                    <Link className="sidebar-link" to="/lenta">Рекомендации</Link>
                </div>
            </div>
        )
    }
}
