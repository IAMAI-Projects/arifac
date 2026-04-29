import * as migration_20260416_024626_init_prod from './20260416_024626_init_prod';
import * as migration_20260421_050159_add_media_and_pdf from './20260421_050159_add_media_and_pdf';
import * as migration_20260422_005529_add_cert_launch_status_order from './20260422_005529_add_cert_launch_status_order';
import * as migration_20260422_065435_add_contact_page_fields from './20260422_065435_add_contact_page_fields';
import * as migration_20260422_120000_category_enum_to_text from './20260422_120000_category_enum_to_text';
import * as migration_20260422_195552_add_site_settings_and_ui_labels from './20260422_195552_add_site_settings_and_ui_labels';
import * as migration_20260424_000000_add_gallery from './20260424_000000_add_gallery';
import * as migration_20260424_120000_add_gallery_page_global from './20260424_120000_add_gallery_page_global';
import * as migration_20260428_052344 from './20260428_052344';

export const migrations = [
  {
    up: migration_20260416_024626_init_prod.up,
    down: migration_20260416_024626_init_prod.down,
    name: '20260416_024626_init_prod',
  },
  {
    up: migration_20260421_050159_add_media_and_pdf.up,
    down: migration_20260421_050159_add_media_and_pdf.down,
    name: '20260421_050159_add_media_and_pdf',
  },
  {
    up: migration_20260422_005529_add_cert_launch_status_order.up,
    down: migration_20260422_005529_add_cert_launch_status_order.down,
    name: '20260422_005529_add_cert_launch_status_order',
  },
  {
    up: migration_20260422_065435_add_contact_page_fields.up,
    down: migration_20260422_065435_add_contact_page_fields.down,
    name: '20260422_065435_add_contact_page_fields',
  },
  {
    up: migration_20260422_120000_category_enum_to_text.up,
    down: migration_20260422_120000_category_enum_to_text.down,
    name: '20260422_120000_category_enum_to_text',
  },
  {
    up: migration_20260422_195552_add_site_settings_and_ui_labels.up,
    down: migration_20260422_195552_add_site_settings_and_ui_labels.down,
    name: '20260422_195552_add_site_settings_and_ui_labels',
  },
  {
    up: migration_20260424_000000_add_gallery.up,
    down: migration_20260424_000000_add_gallery.down,
    name: '20260424_000000_add_gallery',
  },
  {
    up: migration_20260424_120000_add_gallery_page_global.up,
    down: migration_20260424_120000_add_gallery_page_global.down,
    name: '20260424_120000_add_gallery_page_global',
  },
  {
    up: migration_20260428_052344.up,
    down: migration_20260428_052344.down,
    name: '20260428_052344'
  },
];
