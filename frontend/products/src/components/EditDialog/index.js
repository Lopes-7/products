/**
 * IMPORTS
 */
import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import {Container} from './styles';
import * as actions from '../../actions/dataactions';
import {api} from '../../util/api';

/**
 * CODE
 */
function EditDialog(props) {
    // dialog open state
    const [open, setOpen] = useState(false);

    // component dispatch
    const dispatch = useDispatch();

    // product fileds state
    const [product, setProduct] = useState({
        name: props.name,
        price: props.price,
        qty: props.qty,
    });

    // theme for responsiveness
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // function to handle cancel
    function handleCancel() {
        setOpen(false);
    }

    // function to open dialog
    function handleClickOpen() {
        setOpen(true);
    }

    // function to edit product
    async function handleEdit(event) {
        // prevent default behavior
        event.preventDefault();

        // api call
        await api
            .put('/products/' + props.id, {
                name: product.name,
                price: product.price,
                qty: product.qty,
            })
            .then((response) => {
                console.log(response);
            });

        // inform store that data were update
        dispatch(actions.update());

        // close dialog
        setOpen(false);
    }

    return (
        <Container>
            <IconButton
                aria-label="edit"
                size="small"
                onClick={handleClickOpen}
            >
                <EditIcon />
            </IconButton>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleCancel}
                aria-labelledby="responsive-dialog-title"
            >
                <form onSubmit={handleEdit}>
                    <DialogTitle id="responsive-dialog-title">
                        {'Edição de produto'}
                    </DialogTitle>
                    <DialogContent>
                        <div className="formrow">
                            <TextField
                                label="Produto"
                                defaultValue={props.name}
                                variant="outlined"
                                required={true}
                                onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        name: e.target.value,
                                    });
                                }}
                            ></TextField>
                        </div>
                        <div className="formrow">
                            <TextField
                                inputProps={{step: 0.01, min: 0}}
                                label="Preço"
                                defaultValue={props.price}
                                required={true}
                                type="number"
                                variant="outlined"
                                onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        price: Number(e.target.value),
                                    });
                                }}
                            ></TextField>
                        </div>
                        <div className="formrow">
                            <TextField
                                inputProps={{step: 1, min: 0}}
                                label="Quantidade"
                                defaultValue={props.qty}
                                type="number"
                                variant="outlined"
                                required={true}
                                onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        qty: Number(e.target.value),
                                    });
                                }}
                            ></TextField>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} color="primary">
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary">
                            Editar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
}

/**
 * EXPORTS
 */
export default EditDialog;
