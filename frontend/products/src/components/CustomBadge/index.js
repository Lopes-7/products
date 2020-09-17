/**
 * IMPORTS
 */
import React from 'react';
import Badge from '@material-ui/core/Badge';
import {withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';

/**
 * CODE
 */

// defining styles
const styles = () => {
    return {
        customBadgeAlert: {
            backgroundColor: 'yellow',
        },
        customBadgeCritical: {
            backgroundColor: 'red',
        },
        customBadgeOk: {
            backgroundColor: 'green',
        },
    };
};

// custom badge component
function CustomBadge(props) {
    // get component props
    const {classes, sit, content} = props;

    // define color by situation prop
    function situation(classes, sit) {
        switch (sit) {
            case 'alert':
                return classes.customBadgeAlert;
            case 'critical':
                return classes.customBadgeCritical;
            case 'ok':
                return classes.customBadgeOk;
        }
    }

    // render
    return (
        <TableCell>
            <Badge classes={{badge: situation(classes, sit)}} variant="dot">
                <Typography>{content}</Typography>
            </Badge>
        </TableCell>
    );
}

/**
 * EXPORTS
 */
export default withStyles(styles)(CustomBadge);
