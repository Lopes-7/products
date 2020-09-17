/**
 * IMPORTS
 */
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Container} from './styles';
import CustomBadge from '../CustomBadge';
import DeleteDialog from '../DeleteDialog';
import EditDialog from '../EditDialog';
import * as actions from '../../actions/dataactions';
import {api} from '../../util/api';

/**
 * CODE
 */
function Display() {
    // data state
    const [data, setData] = useState(null);

    // component dispatch
    const dispatch = useDispatch();

    // filters state
    const filters = useSelector((state) => state.filters);

    // update data state
    const {update} = useSelector((state) => state.data);

    // is loading state
    const [isLoading, setIsLoading] = useState(false);

    // function to fetch data
    async function fetchData() {
        // set state to show spinner
        setIsLoading(true);

        // API call
        api.get('/products')
            .then((response) => {
                // for each product add its situation
                const added = response.data.map((row) => {
                    if (row.qty < 100) {
                        return {...row, sit: 'critical'};
                    } else if (row.qty >= 100 && row.qty <= 200) {
                        return {...row, sit: 'alert'};
                    } else {
                        return {...row, sit: 'ok'};
                    }
                });

                // save added to data state
                setData(added);

                // finish loading
                setIsLoading(false);
            })
            .catch((error) => {
                // finish loading
                setIsLoading(false);
            });
    }

    // effect to fetch data once
    useEffect(() => {
        fetchData();
    }, []);

    // effect to fetch data every time update flag change
    useEffect(() => {
        // update is necessary: fetch data
        if (update) {
            fetchData();
        }
        // inform store that display already updated
        dispatch(actions.updated());
    }, [update]);

    // auxiliar fuction to render product row
    function renderTableRow(id, name, price, qty, sit) {
        // render product row
        return (
            <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <CustomBadge sit={sit} content={name}></CustomBadge>
                <TableCell>{price}</TableCell>
                <TableCell>{qty}</TableCell>
                <TableCell align="right">
                    <EditDialog name={name} price={price} qty={qty} id={id} />
                </TableCell>
                <TableCell align="right">
                    <DeleteDialog name={name} id={id} />
                </TableCell>
            </TableRow>
        );
    }

    // determine which rows must be shown
    let selectedRows = [];
    if (data !== null) {
        // for each row of data
        for (let row of data) {
            // alert filter is active: select alert rows
            if (filters.alert) {
                if (row.sit === 'alert') {
                    selectedRows.push(row);
                }
            }

            // critical filter is active: select alert rows
            if (filters.critical) {
                if (row.sit === 'critical') {
                    selectedRows.push(row);
                }
            }

            // ok filter is active: select alert rows
            if (filters.ok) {
                if (row.sit === 'ok') {
                    selectedRows.push(row);
                }
            }

            // all filters are inactive: select all rows
            if (!filters.alert && !filters.critical && !filters.ok) {
                selectedRows.push(row);
            }
        }
    }

    // render
    return (
        <Container>
            {isLoading && (
                <CircularProgress
                    style={{marginLeft: '400px', marginTop: '50px'}}
                />
            )}
            {!isLoading && data !== null && (
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Preço</TableCell>
                                <TableCell>Quantidade</TableCell>
                                <TableCell align="right">Editar</TableCell>
                                <TableCell align="right">Apagar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedRows.map((row) =>
                                renderTableRow(
                                    row._id,
                                    row.name,
                                    row.price,
                                    row.qty,
                                    row.sit
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}

/**
 * EXPORTS
 */
export default Display;
