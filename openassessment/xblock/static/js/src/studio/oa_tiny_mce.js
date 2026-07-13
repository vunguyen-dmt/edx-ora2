/* Get tinyMCE comfig */
/* jshint unused:false */
// eslint-disable-next-line no-unused-vars
export const oaTinyMCE = (options) => {
  const CUSTOM_FONTS = 'Default=\'Open Sans\', Verdana, Arial, Helvetica, sans-serif;';
  const STANDARD_FONTS = 'Andale Mono=andale mono,times;'
    + 'Arial=arial,helvetica,sans-serif;'
    + 'Arial Black=arial black,avant garde;'
    + 'Book Antiqua=book antiqua,palatino;'
    + 'Comic Sans MS=comic sans ms,sans-serif;'
    + 'Courier New=courier new,courier;'
    + 'Georgia=georgia,palatino;'
    + 'Helvetica=helvetica;'
    + 'Impact=impact,chicago;'
    + 'Symbol=symbol;'
    + 'Tahoma=tahoma,arial,helvetica,sans-serif;'
    + 'Terminal=terminal,monaco;'
    + 'Times New Roman=times new roman,times;'
    + 'Trebuchet MS=trebuchet ms,geneva;'
    + 'Verdana=verdana,geneva;'
    + 'Webdings=webdings;'
    + 'Wingdings=wingdings,zapf dingbats';

  const getFonts = () => CUSTOM_FONTS + STANDARD_FONTS;
  const baseAssetUrl = options.base_asset_url;
  const extensionsUrl = options.extensions_url;
  const courseId = options.course_id;
  const staticUrl = '/static/';

  const dataHandler = (key, ...urls) => (data) => {
    if (data[key]) {
      data[key] = window.rewriteStaticLinks(data[key], ...urls);
    }
  };

  const setupTinyMCE = (ed) => {
    ed.on('SaveImage', dataHandler('src', staticUrl, baseAssetUrl));
    ed.on('SaveLink', dataHandler('href', staticUrl, baseAssetUrl));

    if (extensionsUrl && courseId) {
      const iframeOrigin = new URL(extensionsUrl).origin;

      ed.ui.registry.addButton('browsefiles', {
        icon: 'browse',
        tooltip: 'Browse Files',
        onAction: () => {
          const iframeSrc = `${extensionsUrl}embed/assets/course/${courseId}`;

          const backdrop = document.createElement('div');
          Object.assign(backdrop.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: '100000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          });

          const modal = document.createElement('div');
          Object.assign(modal.style, {
            backgroundColor: '#fff',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '1100px',
            height: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          });

          const header = document.createElement('div');
          Object.assign(header.style, {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: '1px solid #e0e0e0',
          });
          const title = document.createElement('span');
          title.textContent = 'Files';
          Object.assign(title.style, { fontWeight: '600', fontSize: '16px' });
          const closeBtn = document.createElement('button');
          closeBtn.textContent = '✕';
          Object.assign(closeBtn.style, {
            border: 'none',
            background: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '4px 8px',
          });

          header.appendChild(title);
          header.appendChild(closeBtn);
          modal.appendChild(header);

          const iframe = document.createElement('iframe');
          iframe.src = iframeSrc;
          iframe.title = 'File Browser';
          Object.assign(iframe.style, {
            flex: '1',
            border: 'none',
            width: '100%',
          });
          modal.appendChild(iframe);
          backdrop.appendChild(modal);

          const closeModal = () => {
            window.removeEventListener('message', handleMessage);
            backdrop.remove();
          };

          const handleMessage = (event) => {
            if (event.origin !== iframeOrigin) return;
            if (event.data && event.data.action === 'insert-content') {
              if (event.data.content) {
                ed.execCommand('mceInsertContent', false, event.data.content);
              }
              closeModal();
            }
          };

          window.addEventListener('message', handleMessage);
          closeBtn.addEventListener('click', closeModal);
          backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeModal();
          });

          document.body.appendChild(backdrop);
        },
      });
    }
  };

  const initInstanceCallback = (ed) => {
    ed.setContent(window.rewriteStaticLinks(
      ed.getContent({ no_events: 1 }),
      staticUrl,
      baseAssetUrl,
    ));
    return ed.focus();
  };

  const fileBrowserButton = (extensionsUrl && courseId) ? ' browsefiles' : '';

  return {
    height: '300',
    font_formats: getFonts(),
    base_url: '/static/studio/js/vendor/tinymce/js/tinymce/',
    theme: 'silver',
    skin: 'studio-tmce5',
    content_css: 'studio-tmce5',
    schema: 'html5',
    convert_urls: false,
    directionality: $('.wrapper-view, .window-wrap').prop('dir'),
    formats: {
      code: { inline: 'code' },
    },
    visual: false,
    plugins: 'link, lists, codesample, emoticons, table, hr, charmap, code, autoresize, image, imagetools, media',
    image_advtab: true,
    toolbar: 'undo redo | formatselect | fontselect | fontsizeselect | bold italic underline strikethrough forecolor backcolor | '
      + 'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image media link unlink blockquote | '
      + `table emoticons charmap tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry hr | removeformat${fileBrowserButton}`,
    block_formats: `${gettext('Paragraph')}=p;${gettext('Preformatted')}=pre;${gettext('Heading 3')}=h3;${gettext('Heading 4')}=h4;${gettext('Heading 5')}=h5;${gettext('Heading 6')}=h6`,
    menubar: false,
    statusbar: false,
    valid_children: '+body[style]',
    valid_elements: '*[*]',
    extended_valid_elements: '*[*]',
    invalid_elements: '',
    setup: setupTinyMCE,
    init_instance_callback: initInstanceCallback,
    browser_spellcheck: true,
    draggable_modal: true,
    external_plugins: { tiny_mce_wiris: 'https://www.wiris.net/demo/plugins/tiny_mce/plugin.js' }
  };
};

export default oaTinyMCE;
