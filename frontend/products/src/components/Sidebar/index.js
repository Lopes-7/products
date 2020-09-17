/**
 * IMPORTS
 */
import React from 'react';
import {Container} from './styles';
import AdditionForm from '../AdditionForm';
import FilterBar from '../FilterBar';

/**
 * CODE
 */
function Sidebar() {
    return (
        <Container>
            <div className="row">
                <AdditionForm />
            </div>
            <div className="row">
                <FilterBar />
            </div>
        </Container>
    );
}

/**
 * EXPORTS
 */
export default Sidebar;
