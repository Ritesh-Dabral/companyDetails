import React from 'react'

function Table({allRes}) {
    return (
        <tr>
            <td>{allRes.CIN}</td>
            <td>{allRes.name}</td>
        </tr>
    )
}

export default Table
