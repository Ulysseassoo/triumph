import { Driver } from '@/lib/apiEntities'
import { DriverExperienceTable } from '../driverExperience/DriverExperienceTable'
import { Card } from '../ui/Card'

const DriverExperienceCard = ({ driver }: { driver: Driver }) => {

    if (driver.experiences.length === 0) {
        return (
            <Card className='p-6'>
                <h2 className="text-2xl font-semi tracking-tight mb-6">
                    Expériences
                </h2>
                <div style={{ textAlign: "center" }}>Ce conducteur n'a pas d'expériences.</div>
            </Card>
        )
    }

    return (
        <Card className='p-6'>
            <h2 className="text-2xl font-semi tracking-tight mb-6">
                Expériences
            </h2>
            <DriverExperienceTable experiences={driver.experiences} />
        </Card >
    )
}

export default DriverExperienceCard
