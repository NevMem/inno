import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Sidebar extends Component {
    render() {
        return (
            <div style={{position: "fixed", top: "90px", left: "30px"}}>
                <div>
                    <img
                        style={{width: "70px", marginBottom: '20px', marginLeft: '10px'}}
                        src="https://www.mos.ru/upload/structure/institutions/icon/gerald_msc2x(7).png" alt="logo" />
                    <div style={{float: 'right', marginLeft: '10px'}}>
                        <div style={{width: '70px'}}>
                            Департамент культуры
                        </div>
                        <div>
                            города Москвы
                        </div>
                    </div>
                </div>
                <div>
                    <Link className="sidebar-link" to="/search">Книги</Link>
                </div>
                <div>
                    <Link className="sidebar-link" to="/userData">Мои данные</Link>
                </div>
                <div>
                    <Link className="sidebar-link" to="/lenta">Рекомендации</Link>
                </div>
                <div
                    style={{padding: '5px', paddingLeft: '14px', color: '#707070', cursor: 'pointer', zIndex: '10000'}}>
                        <a className="presentation" href="https://drive.google.com/file/d/1amG1vAVRpLjt-Rx0FMESRseUIsabYLdh/view?usp=sharing">
                            @artificial_intelligentsia
                        </a>
                </div>
            </div>
        )
    }
}
