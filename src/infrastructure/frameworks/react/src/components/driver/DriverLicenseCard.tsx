import { Driver } from '@/lib/apiEntities'
import { DriverLicenseTable } from '../driverLicense/DriverLicenseTable'
import { Card } from '../ui/Card'

const DriverLicenseCard = ({ driver }: { driver: Driver }) => {

    if (driver.licenses.length === 0) {
        return (
            <Card className='p-6'>
                <h2 className="text-2xl font-semi tracking-tight mb-6">
                    Permis
                </h2>
                <div style={{ textAlign: "center" }}>Ce conducteur n'a pas permis.</div>
            </Card>
        )
    }

    return (
        <Card className='p-6'>
            <h2 className="text-2xl font-semi tracking-tight mb-6">
                Expériences
            </h2>
            <DriverLicenseTable licenses={driver.licenses} />
        </Card >
    )
}

export default DriverLicenseCard
