const DEVICES = [
    {viewport: "macbook-15", type: "desktop"},
    {viewport: "ipad-2", type: "mobile"},
    {viewport: [1280, 720], type: "desktop"},
    {viewport: [375, 667], type: "mobile"},
];

describe('mobileDevices', () => {
    // it('using the viewport', () => {
    //     cy.viewport(1280, 720)
    //     cy.visit("/")
    //     cy.contains("Safari").should("exist")
    // })
    //
    // it('using the mobile viewport', () => {
    //     cy.viewport(375, 667)
    //     cy.visit("/")
    //     cy.contains("Safari").should("not.be.visible")
    // })
    //
    // it('using the desktop viewport preset', () => {
    //     cy.viewport("macbook-15")
    //     cy.visit("/")
    //     cy.contains("Safari").should("exist")
    // })

    // DEVICES.forEach((device, index) => {
    //
    //     if (device.type == "desktop") {
    //         it(`desktop device test #${index} `, () => {
    //             if (Cypress._.isArray(device.viewport)) {
    //                 cy.viewport(device.viewport[0], device.viewport[1])
    //             } else cy.viewport(device.viewport)
    //             cy.visit("/")
    //             cy.contains("Safari").should("exist")
    //         });
    //     } else {
    //         it(`mobile device test #${index} `, () => {
    //
    //             if (Cypress._.isArray(device.viewport)) {
    //                 cy.viewport(device.viewport[0], device.viewport[1])
    //             } else cy.viewport(device.viewport)
    //             cy.visit("/")
    //             cy.contains("Safari").should("not.be.visible")
    //         });
    //     }
    //
    //
    // })

    DEVICES.forEach((device) => {
        const { viewport, type } = device
        const [width, height] = Array.isArray(viewport) ? viewport : [viewport]

        it(`testing device ${viewport}`, () => {
            cy.log( height)
            cy.viewport(width, height)
            cy.visit('/')
            cy.wait(5000)


            if (type === 'mobile') {
                cy.contains('Safari').should('not.be.visible')
            } else {
                cy.contains('Safari').should('be.visible')
            }
        })
    })


})

