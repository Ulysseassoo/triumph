import { DriverExperienceTable } from '../driverExperience/DriverExperienceTable'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Plus } from 'lucide-react'
import { AddDriverExperienceDialog } from '../driverExperience/AddDriverExperienceDialog'
import { DriverExperience } from '@/interfaces/DriverExperienceInterface'
import { Driver } from '@/interfaces/DriverInterface'

const DriverExperienceCard = ({ driver, onAddExperience }: { driver: Driver, onAddExperience: (experience: DriverExperience) => void }) => {
    return (
        <Card className='p-6'>
            <h2 className="text-2xl font-semi tracking-tight mb-6">
                Expériences
            </h2>

            {
                !driver.experiences || driver.experiences.length === 0 ?
                    <div style={{ textAlign: "center" }}>Ce conducteur n'a pas d'expériences.</div>
                    :
                    <DriverExperienceTable experiences={driver.experiences ?? []} />
            }

            <AddDriverExperienceDialog driver={driver} onDriverExperienceAdded={onAddExperience}>
                <Button className='mt-8'>
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter une expérience
                </Button>
            </AddDriverExperienceDialog>
        </Card >
    )
}

export default DriverExperienceCard
