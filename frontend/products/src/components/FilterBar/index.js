/**
 * IMPORTS
 */
import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import {Container} from './styles';
import * as actions from '../../actions/filteractions';

/**
 * CODE
 */
function FilterBar() {
    // internal filters state
    const [checked, setChecked] = useState({
        alert: false,
        critical: false,
        ok: false,
    });

    // component dispatch
    const dispatch = useDispatch();

    return (
        <Container>
            <h1>Filtros</h1>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch
                            checked={checked.alert}
                            color="primary"
                            onChange={() => {
                                setChecked({...checked, alert: !checked.alert});
                                dispatch(actions.toggleFilterAlert());
                            }}
                        />
                    }
                    label="Alerta"
                    labelPlacement="top"
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={checked.critical}
                            color="primary"
                            onChange={() => {
                                setChecked({
                                    ...checked,
                                    critical: !checked.critical,
                                });
                                dispatch(actions.toggleFilterCritical());
                            }}
                        />
                    }
                    label="Crítico"
                    labelPlacement="top"
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={checked.ok}
                            color="primary"
                            onChange={() => {
                                setChecked({...checked, ok: !checked.ok});
                                dispatch(actions.toggleFilterOk());
                            }}
                        />
                    }
                    label="OK"
                    labelPlacement="top"
                />
            </FormGroup>
        </Container>
    );
}

/**
 * EXPORTS
 */
export default FilterBar;
