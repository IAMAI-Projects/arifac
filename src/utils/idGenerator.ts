import { prisma } from '@/lib/prisma';

const SECTOR_MAP: Record<string, string> = {
  "BANKING": "BANK",
  "SECURITIES & CAPITAL MARKETS": "SEC",
  "PAYMENTS, REMITTANCE & FX": "PAY",
  "INSURANCE": "INS",
  "NBFCs & MICROFINANCE": "NBFC",
  "FINTECH & DIGITAL FINANCE": "FIN",
  "DNFBP (REAL ESTATE, BULLION, ETC.)": "DNFB",
  "FIDUCIARY, CUSTODIAL & DATA": "FID",
  "VDA ECOSYSTEM": "VDA",
  "AML/CFT TECH & ADVISORY": "AML",
};

export class IdGenerator {
  /**
   * Atomically get the next sequence number for a given type and year.
   */
  private static async getNextSeq(type: string, year?: number): Promise<number> {
    const sequence = await prisma.sequences.upsert({
      where: {
        type_year: {
          type,
          year: year ?? 0,
        },
      },
      update: {
        last_val: {
          increment: 1,
        },
      },
      create: {
        type,
        year: year ?? 0,
        last_val: 1,
      },
    });

    return sequence.last_val;
  }

  /**
   * Generate Organisation ID: ORG-00001
   */
  static async generateOrgId(): Promise<string> {
    const seq = await this.getNextSeq('ORG');
    return `ORG-${seq.toString().padStart(5, '0')}`;
  }

  /**
   * Generate Application Reference ID: ARF-APP-YY-00001
   */
  static async generateApplicationRefId(): Promise<string> {
    const now = new Date();
    const yearShort = now.getFullYear().toString().slice(-2);
    const yearInt = now.getFullYear();
    const seq = await this.getNextSeq('APP', yearInt);
    return `ARF-APP-${yearShort}-${seq.toString().padStart(5, '0')}`;
  }

  /**
   * Generate Payment Reference ID: ARF-PAY-YY-00001
   */
  static async generatePaymentRefId(): Promise<string> {
    const now = new Date();
    const yearShort = now.getFullYear().toString().slice(-2);
    const yearInt = now.getFullYear();
    const seq = await this.getNextSeq('PAY', yearInt);
    return `ARF-PAY-${yearShort}-${seq.toString().padStart(5, '0')}`;
  }

  /**
   * Generate Primary Membership ID: ARF-M-YY-CAT-00001
   */
  static async generateMembershipId(sector: string): Promise<string> {
    const now = new Date();
    const yearShort = now.getFullYear().toString().slice(-2);
    const yearInt = now.getFullYear();
    
    // Normalize sector name to uppercase for mapping
    const upperSector = sector?.toUpperCase() || 'OTHER';
    const cat = SECTOR_MAP[upperSector] || 'OTHERS';
    
    // Sequence is unique per year and category group? 
    // Usually, membership sequence is global or per year. 
    // Requirements say ARF-M-YY-CAT-SEQ. Let's make SEQ unique per year.
    const seq = await this.getNextSeq('MEMBERSHIP', yearInt);
    
    return `ARF-M-${yearShort}-${cat}-${seq.toString().padStart(5, '0')}`;
  }
}
