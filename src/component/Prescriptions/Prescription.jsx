import React, { useState, useRef } from 'react';
import { Button, Modal } from 'flowbite-react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import download from 'downloadjs';
import styles from '../../styles/Prescriptions.module.css';
import { HiUserGroup, HiPaperAirplane, HiDownload } from "react-icons/hi";
import logo from '../../../public/media/logo/Blanco.png'

function ListPatients () {

    return (
        <Button gradientMonochrome="cyan">
            <HiUserGroup className="mr-2 h-5 w-5" />
            Lista Pacientes
        </Button>
    )
}

function ListMedicines () {

    return (
        <Button gradientMonochrome="lime">
            Lista Medicamentos
        </Button>
    )
}

function PrescriptionModal () {
    
}

export default function MakePrescriptions() {

    const inputNombreRef = useRef("");
    const inputMedicamentoRef = useRef("");
    const inputTratamientoRef = useRef("");

    const [modalGenerateState, setModalGenerateState] = useState(false);
    
    const [pdfDoc, setPdfDoc] = useState(null);
    const [isSending, setIsSending] = useState(false);

    const handleButtonClick = () => {
      setIsSending(true);
      // Simulación de envío de datos
      setTimeout(() => {
        setIsSending(false);
      }, 1500); // Tiempo de simulación de envío (0.5 segundos)
    };

    const createPdf = async () => {
        
        const nombrePaciente = inputNombreRef.current;
        const nombreMedicamento = inputMedicamentoRef.current;
        const Tratamiento = inputTratamientoRef.current;

        

        const pdfDoc = await PDFDocument.create()
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    
        const page = pdfDoc.addPage()
        const { width, height } = page.getSize()
        const fontSize = 30

        /*
        const logoUrl = process.env.PUBLIC_URL + '/media/logo/Blanco.png';
        const logoImageBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
        const logoImage = await pdfDoc.embedPng(logoImageBytes)

        const form = pdfDoc.getForm()
        const button = form.createButton('logo.button')
        button.addToPage('logo', page, { x: 50, y: 900, size: 15 })

        const logoImageField = form.getButton('logo.button')
        logoImageField.setImage(logoImage)
        */

        page.drawText('TransMed', { x: 50, y: 800, size: 40, color:  rgb(0.176, 0.165, 0.439)})

        page.drawText('Nombre Paciente: ____________________________________________', { x: 50, y: 700, size: 15 })

        page.drawText('Fecha:', { x: 50, y: 600, size: 15 })

        page.drawText('Nombre Medicamento: _________________________________________', { x: 50, y: 500, size: 15 })

        page.drawText('Tratamiento: __________________________________________', { x: 50, y: 400, size: 15 })

        page.drawText('Notas:', { x: 50, y: 300, size: 15 })


        const currentDate = new Date();
        //'Nombre paciente: ' es x = 175
        page.drawText(nombrePaciente, { x: 175, y: 700, size: 15 })
        page.drawText(currentDate.toLocaleString(), { x: 100, y: 600, size: 15 })
        page.drawText(nombreMedicamento, { x: 205, y: 500, size: 15 })
        page.drawText(Tratamiento, { x: 138, y: 400, size: 15 })


        //Guardar documento
        const pdfBytes = await pdfDoc.save()
        setPdfDoc(pdfBytes);
        
        
    }

    async function handleSubmitGenerate(event) {
        event.preventDefault();

        await createPdf();

        setModalGenerateState(true);
    }

    function handleSubmitSend() {

        console.log("send");
        
    }

    function handleSubmitDownload() {

        download(pdfDoc, "receta.pdf", "pdf");
        
    }

    const handleNombreInput = (event) => {
        inputNombreRef.current= event.target.value;
    };

    const handleMedicamentoInput = (event) => {
        inputMedicamentoRef.current= event.target.value;
    };

    const handleTratamientoInput = (event) => {
        inputTratamientoRef.current= event.target.value;
    };

    const onCloseGenerateHandler = () =>{
        setModalGenerateState(false);
    }

  return (
    <div className={styles.cont_main}>
        <div className={styles['recipe-form']}>
            <p className={styles['titulo']}>Nueva Receta</p>
            <form onSubmit={handleSubmitGenerate}>
                <div className={styles['input-group']}>
                    <div className={styles['input-container']}>
                        <label htmlFor="patientName" className={styles.label}>Nombre Paciente:</label>
                        <input type="text" required id="patientName" name="patientName" className={styles.inputNombre} onChange={handleNombreInput}/>
                        <ListPatients/>
                    </div>
                
                    <div className={styles['input-container']}>
                        <label htmlFor="medicationName" className={styles.label}>Nombre Medicamento:</label>
                        <input type="text" required id="medicationName" name="medicationName" className={styles.inputMedicamento} onChange={handleMedicamentoInput}/>
                        <ListMedicines/>
                    </div>
                
                    <div className={styles['input-container']}>
                        <label htmlFor="treatmentDuration" className={styles.label}>Duración tratamiento:</label>
                        <input type="text" required id="treatmentDuration" name="treatmentDuration" className={styles.inputTratamiento} onChange={handleTratamientoInput}/>
                    </div>
                </div>

                <div className={styles['textarea-group']}>
                    <label htmlFor="notes" className={styles.label}>Notas:</label>
                    <div className={styles['input-container']}>
                        <textarea id="notes" name="notes" className={styles.textarea} />
                    </div>
                </div>

                <div className={styles['button-container']}>
                    <Button type="submit" className={styles['buttonGenerate']}>Generar Receta</Button>
                </div>
                <Modal show={(modalGenerateState) ? true : false} size="lg" popup={true} onClose={onCloseGenerateHandler}>
                    <Modal.Header>Que desea hacer?</Modal.Header>
                    <Modal.Body>
                        <div className="text-center">
                            <br />
                            <div className="flex justify-center gap-4">
                                <form onSubmit={handleSubmitSend}>
                                    <Button 
                                        type="submit" 
                                        className={`${styles.sendButton} ${isSending ? styles.sending : ''}`}
                                        onClick={handleButtonClick}
                                        disabled={isSending}
                                    >
                                        <HiPaperAirplane style={{ marginRight: '8px' }}/> {isSending ? 'Enviando...' : 'Enviar Receta'}
                                    </Button>
                                </form>
                                <form onSubmit={handleSubmitDownload}>
                                    <Button 
                                        type="submit" 
                                        className={styles.downloadButton}
                                    >
                                        <HiDownload style={{ marginRight: '8px' }}/> Descargar Receta
                                        <span className={styles.downloadIcon}></span>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </form>
        </div>
        
        
    </div>
    
  );
};