export function checkFields(_values : any[]) {
    if(_values.length == 0 || _values == undefined || _values == null) {
        console.error("checkFields() invalid parameter");
        return {
            valid: false,
            message: ""
        };
    }

    let nullCount : number = 0, undefinedCount: number = 0;
    let errorMessage: string = "";
    for (let i = 0 ; i<_values.length ; i++) {
        if(_values[i] == null) {
            nullCount++;
        } else if (_values[i] == undefined) {
            undefinedCount++;
        }
    }
    if(nullCount > 0 || undefinedCount > 0) {
        if(nullCount > 0) {
            if (nullCount == 1) 
                errorMessage += nullCount+" field is null";
            else
                errorMessage += nullCount+" fields are null";
        }
        if(undefinedCount > 0) {
            if (undefinedCount == 1) 
                errorMessage += undefinedCount+" field is undefined.";
            else
                errorMessage += undefinedCount+" fields are undefined.";
        }
        return {
            valid: false,
            message: errorMessage
        };
    } else {
        return {
            valid: true,
            message: ""
        };
    }

}