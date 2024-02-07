

const insertObjectQuery = (tableName, dataObject) => {



    let cols = Object.keys(dataObject);
    let vals = Object.values(dataObject);

    let temp = [];

    for (let i = 0; i < vals.length; i++) {
        let num = i + 1;
        temp.push("$" + num);
    }

    return {
         text:  `Insert into ${tableName}(${cols}) values(${temp})`,
         values: vals
    }
}

module.exports = { insertObjectQuery }