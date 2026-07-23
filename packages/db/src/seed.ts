import { prisma } from './client';

const actions = ['Send Email', 'Download PDF', 'Send Solana'];
const triggers = ['Webhook', 'File Upload', 'Form Submission'];

async function main() {
    await Promise.all([
        ...actions.map(action =>
            prisma.availableActions.upsert({
                where: { type: action },
                update: {},
                create: {
                    type: action,
                }
            })
        ),

        ...triggers.map(trigger =>
            prisma.availableTrigger.upsert({
                where: { name: trigger },
                update: {},
                create: {
                    name: trigger,
                }
            })
        )
    ]);
}

main()
  .then(() => console.log("Seeding done"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
