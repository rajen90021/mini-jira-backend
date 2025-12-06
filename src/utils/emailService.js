const nodemailer = require('nodemailer');

/**
 * Create email transporter
 * Configure with your email service provider
 */
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
};

/**
 * Send email notification when a ticket is created
 * @param {Object} ticket - Ticket object
 * @param {Object} assignee - User object of the assignee
 */
const sendTicketCreatedEmail = async (ticket, assignee) => {
    if (!assignee || !assignee.email) {
        console.log('No assignee email found, skipping email notification');
        return;
    }

    const transporter = createTransporter();

    const mailOptions = {
        from: `"Detroit - Project Management" <${process.env.EMAIL_USER}>`,
        to: assignee.email,
        subject: `New Ticket Assigned: ${ticket.title}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .ticket-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
                    .label { font-weight: bold; color: #667eea; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                    .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0; font-size: 28px;">Detroit</h1>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">Project Management System</p>
                    </div>
                    <div class="content">
                        <h2 style="color: #333; margin-top: 0;">New Ticket Assigned to You</h2>
                        <p>Hi ${assignee.name},</p>
                        <p>A new ticket has been assigned to you. Here are the details:</p>
                        
                        <div class="ticket-info">
                            <p><span class="label">Title:</span> ${ticket.title}</p>
                            <p><span class="label">Description:</span> ${ticket.description || 'No description provided'}</p>
                            <p><span class="label">Priority:</span> <strong>${ticket.priority}</strong></p>
                            <p><span class="label">Status:</span> ${ticket.status}</p>
                            <p><span class="label">Project:</span> ${ticket.projectId?.name || 'N/A'}</p>
                        </div>
                        
                        <p>Please log in to the system to view more details and start working on this ticket.</p>
                        
                        <div style="text-align: center;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/app/tickets" class="button">View Ticket</a>
                        </div>
                        
                        <div class="footer">
                            <p>© 2025 Detroit. All rights reserved.</p>
                            <p>This is an automated message, please do not reply to this email.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        // Don't throw error - we don't want email failures to break ticket creation
        return null;
    }
};

/**
 * Send email notification when a ticket is assigned/reassigned
 * @param {Object} ticket - Ticket object
 * @param {Object} assignee - User object of the new assignee
 * @param {Object} previousAssignee - User object of the previous assignee (optional)
 */
const sendTicketAssignedEmail = async (ticket, assignee, previousAssignee = null) => {
    if (!assignee || !assignee.email) {
        console.log('No assignee email found, skipping email notification');
        return;
    }

    const transporter = createTransporter();

    const isReassignment = previousAssignee && previousAssignee._id.toString() !== assignee._id.toString();

    const mailOptions = {
        from: `"Detroit - Project Management" <${process.env.EMAIL_USER}>`,
        to: assignee.email,
        subject: isReassignment ? `Ticket Reassigned: ${ticket.title}` : `Ticket Assigned: ${ticket.title}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .ticket-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
                    .label { font-weight: bold; color: #667eea; }
                    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                    .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 style="margin: 0; font-size: 28px;">Detroit</h1>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">Project Management System</p>
                    </div>
                    <div class="content">
                        <h2 style="color: #333; margin-top: 0;">${isReassignment ? 'Ticket Reassigned to You' : 'Ticket Assigned to You'}</h2>
                        <p>Hi ${assignee.name},</p>
                        <p>${isReassignment ? 'A ticket has been reassigned to you.' : 'A ticket has been assigned to you.'} Here are the details:</p>
                        
                        <div class="ticket-info">
                            <p><span class="label">Title:</span> ${ticket.title}</p>
                            <p><span class="label">Description:</span> ${ticket.description || 'No description provided'}</p>
                            <p><span class="label">Priority:</span> <strong>${ticket.priority}</strong></p>
                            <p><span class="label">Status:</span> ${ticket.status}</p>
                            <p><span class="label">Project:</span> ${ticket.projectId?.name || 'N/A'}</p>
                            ${isReassignment ? `<p><span class="label">Previously Assigned To:</span> ${previousAssignee.name}</p>` : ''}
                        </div>
                        
                        <p>Please log in to the system to view more details and start working on this ticket.</p>
                        
                        <div style="text-align: center;">
                            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/app/tickets" class="button">View Ticket</a>
                        </div>
                        
                        <div class="footer">
                            <p>© 2025 Detroit. All rights reserved.</p>
                            <p>This is an automated message, please do not reply to this email.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        return null;
    }
};

module.exports = {
    sendTicketCreatedEmail,
    sendTicketAssignedEmail,
};
