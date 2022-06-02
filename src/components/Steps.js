const logoSrc = './assets/ico-logo.svg'

export const steps= [
    {
      content:(
        <div>
          <img src={logoSrc} />
          <h4>Bienvenida/o al</h4>
          <h2>Observatorio de la Precariedad en el Sector Cultural</h2>
          <p>Aquí podrás encontrar denuncias anónimas a irregularidades respecto a pagos de empresas españolas a trabajadoras/es del sector cultural agrupadas por Comunidades Autónomas.</p>
          <p>Esta iniciativa pretende mostrar cuál es la realidad del sector cultural en España y convertirse en un espacio de autodefensa y apoyo mutuo para profesionales autónomos</p>
          <p>✊🏻 ✊🏾 ✊🏿</p>
        </div>
      ),
      locale: { skip: <strong aria-label="skip">Cerrar</strong>, next: 'Siguiente', back: 'Atrás' , last: 'Fin' },
      styles: {
        options: {
          arrowColor: '#202020',
          backgroundColor: '#202020 ',
          textColor: '#FFFFFF',
          width: 450,
        },
      },
      placement: 'center',
      disableBeacon: true,
      target: 'body',
    },

    {
      content: <p>Haciendo click en los marcadores del mapa podrás ver un listado con los detalles de las denuncias que profesionales como tú han emitido contra empresas que han incurrido en irregularidades en sus contratos o pagos.</p>,
      floaterProps: {
        disableAnimation: true,
      },
      styles: {
        options: {
          arrowColor: '#202020',
          backgroundColor: '#202020 ',
          textColor: '#FFFFFF',
        },
      },  
      locale: { skip: <strong aria-label="skip">Cerrar</strong>, next: 'Siguiente', back: 'Atrás'  },

      spotlightPadding: 200,
      target: '.map div',
      title: 'Mapa interactivo',
      scrollOffset: 0,
    },
  
    {
      content: (
        <p>Aquí podrás ver los datos que estamos recogiendo de las denuncias realizadas por tipo de abuso, profesión, género o edad.</p>
      ),
      placement: 'top',
      //spotlightPadding: 20,
      scrollOffset: 50,
      styles: {
        options: {
          arrowColor: '#202020',
          width: 300,
          backgroundColor: '#202020 ',
          textColor: '#FFFFFF',          
        },

      },
      locale: { skip: <strong aria-label="skip">Cerrar</strong>, next: 'Siguiente', back: 'Atrás'  },
      target: '.map + .MuiContainer-root div',
      title: 'Panel de datos',
    },

    {
      content: (
        <div>
          <p>Desde estos enlaces podrás obtener información o reportar tu caso mediante un formulario para incorporarlo a nuestra base de datos. Al finalizar el proceso, tendrás acceso a otras personas anónimas que se han encontrado en la misma situación que tú para contactarlas y que te aconsejen.</p>
          <p>También encontrarás algunas entidades que pueden ayudarte</p>
        </div>
        ),
      placement: 'bottom',
      locale: { skip: <strong aria-label="skip">Cerrar</strong>, next: 'Siguiente', back: 'Atrás' , last: 'Fin'},

      styles: {
        options: {
          arrowColor: '#202020',
          backgroundColor: '#202020 ',
          textColor: '#FFFFFF',
        },
      },
      target: '.report div',
      title: 'Cuéntanos tu caso',
    },
  ];
