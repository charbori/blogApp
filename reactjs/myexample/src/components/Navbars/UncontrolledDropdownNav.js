import React from 'react';
import { Link, Route, NavLink as NavLinkPath } from "react-router-dom";
import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

const UncontrolledDropdownNav = ({ navDatas }) => {
    console.log("data uncontrolled dropdown");
    console.log(navDatas);

    if (typeof navDatas !== 'object') {
        return ( <> </> );
    }

    const navItems = new Array(3);
    const navMidItems = new Map();

    for (let i = 0; i < navDatas.length; i++) {
        if (navDatas[i].type == 1) {
            navItems.push(navDatas[i]);
        }
        if (navDatas[i].type == 2) {
            if (typeof navMidItems.get(navDatas[i].xcode) === 'undefined') {
                navMidItems.set(navDatas[i].xcode, navDatas[i].name);
            } else {
                let tempValue = navMidItems.get(navDatas[i].xcode);
                navMidItems.delete(navDatas[i].xcode);
                navMidItems.set(navDatas[i].xcode, tempValue + "|" + navDatas[i].name);
            }
        }
    }
    function getNavMid(datas) {
        if (typeof datas === 'undefined') {
            return(<> </>);
        }
        const splitDatas = datas.split("|");
        return (
            splitDatas.map((data) =>
                <DropdownItem key={data.index} to={data}>
                    {data}
                </DropdownItem>
            )
        );
    }
    console.log(navItems);
    console.log(navMidItems);

    const navMidList = navItems.map((data) =>
        <UncontrolledDropdown nav>
            <DropdownToggle nav>
                <i className="ni ni-collection d-lg-none mr-1" />
                <span className="nav-link-inner--text navbar-theme-menu">{data.name}</span>
            </DropdownToggle>
            <DropdownMenu>
                {getNavMid(navMidItems.get(data.xcode))}
            </DropdownMenu>
        </UncontrolledDropdown>
    );

    return (
        <>
        {navMidList}
        </>
    );
};

export default UncontrolledDropdownNav;
