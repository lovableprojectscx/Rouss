import React, { useState } from 'react';
import { 
  BookClaimsGoldIcon, 
  CloseMinimalIcon, 
  DownloadPdfIcon, 
  WhatsAppGoldIcon, 
  CheckMinimalIcon 
} from './PremiumIcons';
import { createReclamacion } from '../lib/supabase';

/**
 * Modal del Libro de Reclamaciones Virtual conforme a la Ley N° 29571 / INDECOPI
 * Incluye generación de código correlativo único y descarga formal de Hoja de Reclamación
 */
export default function LibroReclamacionesModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [form, setForm] = useState({
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    nombreCompleto: '',
    email: '',
    telefono: '',
    departamento: 'Lima',
    provincia: 'Lima',
    distrito: 'Chorrillos',
    direccion: '',
    esMenorEdad: false,
    nombreApoderado: '',
    tipoBien: 'Producto',
    montoReclamado: '',
    descripcionBien: '',
    tipoReclamacion: 'Reclamo',
    detalleReclamacion: '',
    pedidoConsumidor: '',
    aceptaDeclaracion: false,
    aceptaDatosPersonales: false
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (!form.nombreCompleto.trim() || !form.numeroDocumento.trim() || !form.email.trim() || !form.telefono.trim()) {
      setErrorMsg('Por favor, completa todos los campos obligatorios del consumidor.');
      return;
    }

    if (form.tipoDocumento === 'DNI' && form.numeroDocumento.trim().length !== 8) {
      setErrorMsg('El número de DNI debe contener exactamente 8 dígitos numéricos.');
      return;
    }

    if (!form.descripcionBien.trim() || !form.detalleReclamacion.trim() || !form.pedidoConsumidor.trim()) {
      setErrorMsg('Por favor, completa la descripción del bien, el detalle del reclamo y tu pedido concreto.');
      return;
    }

    if (!form.aceptaDeclaracion || !form.aceptaDatosPersonales) {
      setErrorMsg('Debes aceptar las declaraciones legales para registrar la Hoja de Reclamación conforme a ley.');
      return;
    }

    setLoading(true);

    try {
      const res = await createReclamacion(form);
      if (res) {
        setSubmittedData(res);
      } else {
        setErrorMsg('Ocurrió un inconveniente al registrar el reclamo. Por favor, inténtalo nuevamente o contáctanos directamente.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error de conexión al registrar. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Genera y abre el formato oficial imprimible/PDF de la Hoja de Reclamación INDECOPI
  const handlePrintPDF = () => {
    if (!submittedData) return;

    const fechaRegistro = new Date(submittedData.created_at || Date.now()).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Por favor habilita las ventanas emergentes en tu navegador para descargar la Hoja de Reclamación.');
      return;
    }

    const printHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Hoja de Reclamación ${submittedData.codigo_reclamacion} - Florería Rouss</title>
        <style>
          @page { size: A4; margin: 15mm; }
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            color: #121110;
            line-height: 1.4;
            margin: 0;
            padding: 20px;
            font-size: 12px;
          }
          .header-box {
            border: 2px solid #C59B27;
            padding: 15px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            background: #FAF8F5;
          }
          .store-info h1 {
            margin: 0 0 5px;
            font-size: 18px;
            color: #121110;
            text-transform: uppercase;
          }
          .store-info p {
            margin: 2px 0;
            font-size: 11px;
            color: #555;
          }
          .claim-number-box {
            border: 2px solid #121110;
            padding: 10px 15px;
            text-align: center;
            background: #FFFFFF;
            border-radius: 6px;
          }
          .claim-number-box h2 {
            margin: 0;
            font-size: 13px;
            color: #C59B27;
          }
          .claim-number-box .code {
            font-size: 15px;
            font-weight: bold;
            color: #121110;
            margin: 4px 0 0;
          }
          .section-title {
            background: #121110;
            color: #FFFFFF;
            padding: 5px 10px;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 12px;
            border-radius: 4px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 6px;
          }
          table, th, td {
            border: 1px solid #D5CFC9;
          }
          td, th {
            padding: 6px 8px;
            font-size: 11px;
            vertical-align: top;
          }
          .label {
            font-weight: bold;
            color: #444;
            width: 25%;
            background: #F8F6F2;
          }
          .badge-check {
            display: inline-block;
            padding: 2px 8px;
            background: #C59B27;
            color: #FFFFFF;
            font-weight: bold;
            border-radius: 3px;
            font-size: 10px;
          }
          .legal-notice {
            margin-top: 15px;
            padding: 10px;
            background: #FFFDF8;
            border-left: 4px solid #C59B27;
            font-size: 10px;
            color: #555;
            line-height: 1.4;
          }
          .signatures {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            padding-top: 10px;
          }
          .signature-line {
            width: 45%;
            text-align: center;
            border-top: 1px solid #888;
            padding-top: 5px;
            font-size: 11px;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header-box">
          <div class="store-info">
            <h1>FLORERÍA ROUSS</h1>
            <p><strong>Titular:</strong> Jharol Baldeón (Florería Rouss by Jharol Baldeón)</p>
            <p><strong>Dirección:</strong> Av. Alameda Sur cruce con Av. Los Incas, Chorrillos, Lima - Perú</p>
            <p><strong>WhatsApp:</strong> +51 941 493 471 | <strong>Web:</strong> floreriarouss.com</p>
          </div>
          <div class="claim-number-box">
            <h2>LIBRO DE RECLAMACIONES</h2>
            <p style="margin: 0; font-size: 10px; color: #666;">HOJA DE RECLAMACIÓN</p>
            <div class="code">${submittedData.codigo_reclamacion}</div>
            <p style="margin: 4px 0 0; font-size: 9px; color: #888;">Fecha: ${fechaRegistro}</p>
          </div>
        </div>

        <div class="section-title">1. Identificación del Consumidor Reclamante</div>
        <table>
          <tr>
            <td class="label">Nombre / Razón Social:</td>
            <td><strong>${submittedData.nombre_completo}</strong></td>
            <td class="label">${submittedData.tipo_documento}:</td>
            <td><strong>${submittedData.numero_documento}</strong></td>
          </tr>
          <tr>
            <td class="label">Domicilio:</td>
            <td>${submittedData.direccion}, ${submittedData.distrito}, ${submittedData.provincia}, ${submittedData.departamento}</td>
            <td class="label">Teléfono / Celular:</td>
            <td>${submittedData.telefono}</td>
          </tr>
          <tr>
            <td class="label">Correo Electrónico:</td>
            <td colspan="3">${submittedData.email}</td>
          </tr>
          ${submittedData.es_menor_edad ? `
          <tr>
            <td class="label">Padre / Madre / Tutor:</td>
            <td colspan="3">${submittedData.nombre_apoderado || 'No especificado'}</td>
          </tr>` : ''}
        </table>

        <div class="section-title">2. Identificación del Bien Contratado</div>
        <table>
          <tr>
            <td class="label">Tipo de Bien:</td>
            <td><span class="badge-check">${submittedData.tipo_bien.toUpperCase()}</span></td>
            <td class="label">Monto Reclamado:</td>
            <td><strong>S/ ${parseFloat(submittedData.monto_reclamado || 0).toFixed(2)}</strong></td>
          </tr>
          <tr>
            <td class="label">Descripción del Producto / Servicio:</td>
            <td colspan="3">${submittedData.descripcion_bien}</td>
          </tr>
        </table>

        <div class="section-title">3. Detalle de la Reclamación y Pedido del Consumidor</div>
        <table>
          <tr>
            <td class="label">Naturaleza:</td>
            <td colspan="3"><span class="badge-check">${submittedData.tipo_reclamacion.toUpperCase()}</span> <em>(${submittedData.tipo_reclamacion === 'Reclamo' ? 'Disconformidad relacionada a los productos o servicios adquiridos' : 'Disconformidad referida a la atención o trato al público'})</em></td>
          </tr>
          <tr>
            <td class="label">Detalle de los Hechos:</td>
            <td colspan="3" style="min-height: 50px; white-space: pre-wrap;">${submittedData.detalle_reclamacion}</td>
          </tr>
          <tr>
            <td class="label">Pedido Concreto:</td>
            <td colspan="3" style="min-height: 40px; white-space: pre-wrap;"><strong>${submittedData.pedido_consumidor}</strong></td>
          </tr>
        </table>

        <div class="section-title">4. Acciones y Observaciones del Proveedor</div>
        <table>
          <tr>
            <td class="label">Plazo Legal de Respuesta:</td>
            <td colspan="3">Máximo <strong>15 días hábiles</strong> improrrogables (Conforme a la Ley N° 31435 modificatoria del Código de Protección y Defensa del Consumidor Ley N° 29571).</td>
          </tr>
          <tr>
            <td class="label">Medio de Notificación:</td>
            <td colspan="3">La respuesta formal y motivada será remitida al correo electrónico declarado por el consumidor: <strong>${submittedData.email}</strong>.</td>
          </tr>
        </table>

        <div class="legal-notice">
          <strong>Base Legal:</strong> D.S. 011-2011-PCM, D.S. 006-2014-PCM y Ley N° 31435. La formulación del reclamo no impide acudir a otras vías de controversia ni es requisito previo para interponer una denuncia ante el INDECOPI.
        </div>

        <div class="signatures">
          <div class="signature-line">
            Firma o Constancia del Consumidor Reclamante
          </div>
          <div class="signature-line">
            Florería Rouss (Recepción Electrónica Vía Web)
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 400);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(printHtml);
    printWindow.document.close();
  };

  const handleShareWhatsApp = () => {
    if (!submittedData) return;
    const msg = `Hola Florería Rouss, acabo de registrar una Hoja de Reclamación en su plataforma web con Código: *${submittedData.codigo_reclamacion}*. Mi nombre es ${submittedData.nombre_completo} (DNI/Doc: ${submittedData.numero_documento}). Por favor confirmen la recepción. Gracias.`;
    window.open(`https://wa.me/51941493471?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleReset = () => {
    setSubmittedData(null);
    setErrorMsg('');
    setForm({
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      nombreCompleto: '',
      email: '',
      telefono: '',
      departamento: 'Lima',
      provincia: 'Lima',
      distrito: 'Chorrillos',
      direccion: '',
      esMenorEdad: false,
      nombreApoderado: '',
      tipoBien: 'Producto',
      montoReclamado: '',
      descripcionBien: '',
      tipoReclamacion: 'Reclamo',
      detalleReclamacion: '',
      pedidoConsumidor: '',
      aceptaDeclaracion: false,
      aceptaDatosPersonales: false
    });
    onClose();
  };

  return (
    <div className="claims-modal-backdrop" onClick={onClose}>
      <div className="claims-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="claims-modal-header">
          <div className="claims-header-title-group">
            <div className="claims-icon-circle">
              <BookClaimsGoldIcon size={24} color="#C59B27" />
            </div>
            <div>
              <h2>Libro de Reclamaciones Virtual</h2>
              <p>Conforme a la Ley N° 29571 (Código de Protección y Defensa del Consumidor) e INDECOPI</p>
            </div>
          </div>
          <button className="claims-close-btn" onClick={onClose} title="Cerrar ventana">
            <CloseMinimalIcon size={20} color="#8C857B" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="claims-modal-body">
          
          {submittedData ? (
            /* Pantalla de Éxito / Constancia Emitida */
            <div className="claims-success-card">
              <div className="claims-success-icon-wrap">
                <CheckMinimalIcon size={40} color="#1EBE5D" strokeWidth={2.5} />
              </div>
              <h3>¡Hoja de Reclamación Registrada Exitosamente!</h3>
              <p className="claims-success-subtitle">
                Se ha generado tu constancia oficial con número correlativo único registrado en nuestro sistema.
              </p>

              <div className="claims-code-badge">
                <span className="code-label">Código de Reclamación:</span>
                <span className="code-value">{submittedData.codigo_reclamacion}</span>
              </div>

              <div className="claims-info-box">
                <p>
                  📅 <strong>Fecha y Hora:</strong> {new Date().toLocaleString('es-PE')}
                </p>
                <p>
                  👤 <strong>Consumidor:</strong> {submittedData.nombre_completo} ({submittedData.tipo_documento}: {submittedData.numero_documento})
                </p>
                <p>
                  ⏱️ <strong>Plazo Legal de Respuesta:</strong> Máximo <strong>15 días hábiles</strong> improrrogables (Ley N° 31435).
                </p>
                <p>
                  📧 <strong>Notificación:</strong> La respuesta oficial será remitida a tu correo: <strong>{submittedData.email}</strong>.
                </p>
              </div>

              <div className="claims-actions-grid">
                <button onClick={handlePrintPDF} className="btn-download-pdf">
                  <DownloadPdfIcon size={20} color="#FFFFFF" />
                  <span>Descargar / Imprimir Hoja de Reclamación (PDF)</span>
                </button>

                <button onClick={handleShareWhatsApp} className="btn-wa-claim-confirm">
                  <WhatsAppGoldIcon size={20} color="#FFFFFF" />
                  <span>Notificar Registro vía WhatsApp</span>
                </button>
              </div>

              <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                <button onClick={handleReset} className="btn-claims-done">
                  Entendido y Finalizar
                </button>
              </div>
            </div>
          ) : (
            /* Formulario de Reclamación INDECOPI */
            <form onSubmit={handleSubmit} className="claims-form">
              
              {errorMsg && (
                <div className="claims-error-banner">
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Proveedor Info Banner */}
              <div className="provider-info-banner">
                <div>
                  <strong>Proveedor:</strong> Florería Rouss by Jharol Baldeón
                </div>
                <div>
                  <strong>Dirección Comercial:</strong> Av. Alameda Sur cruce con Av. Los Incas, Chorrillos, Lima
                </div>
              </div>

              {/* SECCIÓN 1: IDENTIFICACIÓN DEL CONSUMIDOR */}
              <div className="claims-section-block">
                <div className="claims-section-title">
                  <span>1</span> Identificación del Consumidor Reclamante
                </div>
                
                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">Tipo de Documento *</label>
                    <select 
                      name="tipoDocumento" 
                      value={form.tipoDocumento} 
                      onChange={handleChange} 
                      className="form-select"
                      required
                    >
                      <option value="DNI">DNI (Documento Nacional de Identidad)</option>
                      <option value="CE">Carné de Extranjería (CE)</option>
                      <option value="RUC">RUC</option>
                      <option value="PASAPORTE">Pasaporte</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Número de Documento *</label>
                    <input 
                      type="text" 
                      name="numeroDocumento" 
                      placeholder={form.tipoDocumento === 'DNI' ? '8 dígitos' : 'Número de documento'} 
                      value={form.numeroDocumento} 
                      onChange={handleChange} 
                      className="form-input" 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Nombres y Apellidos Completos / Razón Social *</label>
                  <input 
                    type="text" 
                    name="nombreCompleto" 
                    placeholder="Ej. María Elena Flores Ramos" 
                    value={form.nombreCompleto} 
                    onChange={handleChange} 
                    className="form-input" 
                    required 
                  />
                </div>

                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">Correo Electrónico (Para envío de respuesta) *</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="correo@ejemplo.com" 
                      value={form.email} 
                      onChange={handleChange} 
                      className="form-input" 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Teléfono / WhatsApp *</label>
                    <input 
                      type="tel" 
                      name="telefono" 
                      placeholder="987 654 321" 
                      value={form.telefono} 
                      onChange={handleChange} 
                      className="form-input" 
                      required 
                    />
                  </div>
                </div>

                <div className="form-grid-2col">
                  <div className="form-group">
                    <label className="form-label">Distrito *</label>
                    <input 
                      type="text" 
                      name="distrito" 
                      placeholder="Ej. Chorrillos, Surco, Miraflores..." 
                      value={form.distrito} 
                      onChange={handleChange} 
                      className="form-input" 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Dirección Domiciliaria *</label>
                    <input 
                      type="text" 
                      name="direccion" 
                      placeholder="Av. / Jr. / Calle, Nro, Urb." 
                      value={form.direccion} 
                      onChange={handleChange} 
                      className="form-input" 
                      required 
                    />
                  </div>
                </div>

                {/* Checkbox Menor de edad */}
                <div className="claims-checkbox-row" style={{ marginTop: '0.5rem' }}>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="esMenorEdad" 
                      checked={form.esMenorEdad} 
                      onChange={handleChange} 
                    />
                    <span>El consumidor es menor de edad</span>
                  </label>
                </div>

                {form.esMenorEdad && (
                  <div className="form-group" style={{ marginTop: '0.5rem' }}>
                    <label className="form-label">Nombre del Padre, Madre o Representante Legal *</label>
                    <input 
                      type="text" 
                      name="nombreApoderado" 
                      placeholder="Nombres y DNI del apoderado" 
                      value={form.nombreApoderado} 
                      onChange={handleChange} 
                      className="form-input" 
                    />
                  </div>
                )}
              </div>

              {/* SECCIÓN 2: IDENTIFICACIÓN DEL BIEN CONTRATADO */}
              <div className="claims-section-block">
                <div className="claims-section-title">
                  <span>2</span> Identificación del Bien Contratado
                </div>

                <div className="form-grid-2col" style={{ alignItems: 'center' }}>
                  <div className="form-group">
                    <label className="form-label">Tipo de Bien *</label>
                    <div className="radio-group-flex">
                      <label className={`radio-pill ${form.tipoBien === 'Producto' ? 'active' : ''}`}>
                        <input 
                          type="radio" 
                          name="tipoBien" 
                          value="Producto" 
                          checked={form.tipoBien === 'Producto'} 
                          onChange={handleChange} 
                        />
                        <span>Producto (Arreglo floral, ramo, etc.)</span>
                      </label>
                      <label className={`radio-pill ${form.tipoBien === 'Servicio' ? 'active' : ''}`}>
                        <input 
                          type="radio" 
                          name="tipoBien" 
                          value="Servicio" 
                          checked={form.tipoBien === 'Servicio'} 
                          onChange={handleChange} 
                        />
                        <span>Servicio (Delivery, decoración, etc.)</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Monto Reclamado (S/)</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      name="montoReclamado" 
                      placeholder="0.00" 
                      value={form.montoReclamado} 
                      onChange={handleChange} 
                      className="form-input" 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Descripción del Producto o Servicio *</label>
                  <input 
                    type="text" 
                    name="descripcionBien" 
                    placeholder="Ej. Ramo Buchón de 24 Rosas Rojas con dedicatoria" 
                    value={form.descripcionBien} 
                    onChange={handleChange} 
                    className="form-input" 
                    required 
                  />
                </div>
              </div>

              {/* SECCIÓN 3: DETALLE DE LA RECLAMACIÓN Y PEDIDO */}
              <div className="claims-section-block">
                <div className="claims-section-title">
                  <span>3</span> Detalle de la Reclamación y Pedido del Consumidor
                </div>

                <div className="form-group">
                  <label className="form-label">Tipo de Disconformidad *</label>
                  <div className="radio-group-flex">
                    <label className={`radio-pill claim-type-pill ${form.tipoReclamacion === 'Reclamo' ? 'active' : ''}`}>
                      <input 
                        type="radio" 
                        name="tipoReclamacion" 
                        value="Reclamo" 
                        checked={form.tipoReclamacion === 'Reclamo'} 
                        onChange={handleChange} 
                      />
                      <div>
                        <strong>RECLAMO</strong>
                        <small>Disconformidad relacionada a los productos o servicios adquiridos.</small>
                      </div>
                    </label>

                    <label className={`radio-pill claim-type-pill ${form.tipoReclamacion === 'Queja' ? 'active' : ''}`}>
                      <input 
                        type="radio" 
                        name="tipoReclamacion" 
                        value="Queja" 
                        checked={form.tipoReclamacion === 'Queja'} 
                        onChange={handleChange} 
                      />
                      <div>
                        <strong>QUEJA</strong>
                        <small>Disconformidad referida a la atención o trato al público recibido.</small>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Detalle / Hechos de la Reclamación *</label>
                  <textarea 
                    rows="3" 
                    name="detalleReclamacion" 
                    placeholder="Describe de manera clara y detallada lo sucedido..." 
                    value={form.detalleReclamacion} 
                    onChange={handleChange} 
                    className="form-textarea" 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Pedido Concreto del Consumidor *</label>
                  <textarea 
                    rows="2" 
                    name="pedidoConsumidor" 
                    placeholder="Indica qué solución o acción solicitas a Florería Rouss..." 
                    value={form.pedidoConsumidor} 
                    onChange={handleChange} 
                    className="form-textarea" 
                    required 
                  />
                </div>
              </div>

              {/* DECLARACIONES Y TÉRMINOS LEGALES */}
              <div className="claims-legal-checks">
                <label className="checkbox-label legal-check">
                  <input 
                    type="checkbox" 
                    name="aceptaDeclaracion" 
                    checked={form.aceptaDeclaracion} 
                    onChange={handleChange} 
                    required 
                  />
                  <span>
                    Declaro ser el titular del servicio y que la información consignada en la presente Hoja de Reclamación es verdadera y conforme a la <strong>Ley N° 29571</strong> (Código de Protección y Defensa del Consumidor).
                  </span>
                </label>

                <label className="checkbox-label legal-check">
                  <input 
                    type="checkbox" 
                    name="aceptaDatosPersonales" 
                    checked={form.aceptaDatosPersonales} 
                    onChange={handleChange} 
                    required 
                  />
                  <span>
                    Autorizo el tratamiento de mis datos personales únicamente para fines del trámite, gestión y respuesta de la presente reclamación conforme a la <strong>Ley N° 29733</strong> (Ley de Protección de Datos Personales).
                  </span>
                </label>
              </div>

              <div className="claims-form-footer">
                <button 
                  type="submit" 
                  className="btn-submit-claim" 
                  disabled={loading}
                >
                  {loading ? 'Registrando en Libro de Reclamaciones...' : 'Enviar Hoja de Reclamación'}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
