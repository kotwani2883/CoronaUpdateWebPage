import React from 'react'
import {Card,CardContent,Typography} from '@material-ui/core'
import './InfoBox.css'

function InfoBox({title,cases,total}) {
    return (
        <Card className="infoBox">
            <CardContent>
{/*Titile */}
<Typography className="infoBox__title" color="textSecondary">{title}</Typography>


{/*+120k Number of cases */}
<h2>{cases}</h2>

<Typography className="infoBox__total" color="textSecondary">{total}Total</Typography>
</CardContent>
        </Card>
    )
}

export default InfoBox
