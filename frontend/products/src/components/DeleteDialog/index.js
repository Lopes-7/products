/**
 * IMPORTS
 */
import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import * as actions from '../../actions/dataactions';
import {api} from '../../util/api';

/**
 * CODE
 */
function DeleteDialog(props) {
    // dialog open state
    const [open, setOpen] = useState(false);

    // component dispatch
    const dispatch = useDispatch();

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

    // function to delete product
    async function handleDelete() {
        await api.delete('/products/' + props.id).then((response) => {
            console.log(response);
        });

        // inform store that data were update
        dispatch(actions.update());

        // close dialog
        setOpen(false);
    }

    return (
        <div>
            <IconButton
                aria-label="delete"
                size="small"
                onClick={handleClickOpen}
            >
                <DeleteIcon />
            </IconButton>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleCancel}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {'Deseja deletar este produto?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deseja realmente deletar o produto {props.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        Deletar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

/**
 * EXPORTS
 */
export default DeleteDialog;
