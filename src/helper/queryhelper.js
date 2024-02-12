




// Returns the Query to insert a object(having key as cols of table) into table
const insertObjectQuery = (tableName, dataObject) => {
    let cols = Object.keys(dataObject);
    let vals = Object.values(dataObject);

    let temp = [];

    for (let i = 0; i < vals.length; i++) {
        let num = i + 1;
        temp.push("$" + num);
    }

    return {
        text: `Insert into ${tableName}(${cols}) values(${temp}) returning *`,
        values: vals
    }
}

// Select Query to include all condition with AND
const selectQuery = (tableName, colsArray = ['*'], condtn = {}) => {

    let cols = Object.keys(condtn)
    let vals = Object.values(condtn)
    let condStr = ""

    if (cols.length > 0)
        condStr = " where ";

    for (let i = 0; i < cols.length; i++) {
        condStr += cols[i] + '=' + '$' + (i + 1);
        if (i < cols.length - 1)
            condStr += " And ";
    }

    return {
        text: `SELECT ${colsArray} from ${tableName}  ${condStr} `,
        values: vals
    }

}

const updateQuery = (tableName, dataObject, condtn) => {
    let setStatement = makeStatementFromObject("Set", dataObject, ",", 1);
    let whereStatement = makeStatementFromObject("Where", condtn, "AND", Object.keys(dataObject).length + 1);
    return {
        text: `Update ${tableName} ${setStatement}  ${whereStatement} `,
        values: [...Object.values(dataObject), ...Object.values(condtn)]
    }
}

const deleteQuery = (tableName, condtn) => {

    // Can't Run delete Query without any condition
    if (!condtn)
        return null;

    let values = Object.values(condtn);

    let whereStatement= makeStatementFromObject('Where', condtn, 'AND', 1)

    return {
        text: `Delete from ${tableName} ${whereStatement} `,
        values: values
    }

}



// SubHelpers
function makeStatementFromObject(statementType, dataObj, separateBy, start) {
    let cols = Object.keys(dataObj)
    // let vals = Object.values(condtn)
    let condStr = ""

    if (cols.length > 0)
        condStr = ` ${statementType} `;

    for (let i = 0; i < cols.length; i++) {
        condStr += cols[i] + '=' + '$' + (start);
        if (i < cols.length - 1)
            condStr += ` ${separateBy} `;

        start++;
    }

    return condStr;
}

module.exports = { insertObjectQuery, selectQuery, updateQuery, deleteQuery }