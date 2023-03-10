import { useEffect, useMemo, useState } from 'react';




export const useForm = ( initialForm = {}, formValidations = {}) => {

    const [ formState, setFormState ] = useState( initialForm );
 /*    console.log('formState:', formState) */
    const [ formValidation, setFormValidation ] = useState({});
  /*   console.log('formValidation:', formValidation) */

    useEffect(() => {
        createValidators();
    }, [ formState ])

    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])
    
    
    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }

        return true;
    }, [ formValidation ])


    const onInputChange = ({ target }) => {
        console.log(target)
        const { name, value } = target;
        setFormState({...formState, [ name ]: value })
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }


    const createValidators = () => {
        
        const formCheckedValues = {};

        
        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage ] = formValidations[formField];

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    }



    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}
//const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );

/* const { registerEmail, registerName, registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm( registerFormFields ); */