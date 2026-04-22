import * as migration_20260416_024626_init_prod from './20260416_024626_init_prod';
import * as migration_20260421_050159_add_media_and_pdf from './20260421_050159_add_media_and_pdf';
import * as migration_20260422_005529_add_cert_launch_status_order from './20260422_005529_add_cert_launch_status_order';
import * as migration_20260422_065435_add_contact_page_fields from './20260422_065435_add_contact_page_fields';

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
    name: '20260422_065435_add_contact_page_fields'
  },
];
