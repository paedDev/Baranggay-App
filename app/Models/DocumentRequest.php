<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentRequest extends Model
{
    /** @use HasFactory<\Database\Factories\DocumentRequestFactory> */
    use HasFactory;
    protected $fillable = [
        'user_id',
        'document_type',
        'purpose',
        'personal_info',
        'status',
        'admin_notes',
        'fee',
        'paid'
    ];
    protected $casts = [
        'personal_info' => 'array',
        'requested_at' => 'datetime',
        'completed_at' => 'datetime',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public static function getDocumentTypes()
    {
        return [
            'barangay_clearance' => 'Barangay Clearance',
            'certificate_of_residency' => 'Certificate of Residency',
            'certificate_of_indigency' => 'Certificate of Indigency',
            'business_permit' => 'Business Permit',
            'building_permit' => 'Building Permit',
            'barangay_id' => 'Barangay ID',
        ];
    }
}
