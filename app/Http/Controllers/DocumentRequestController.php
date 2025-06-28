<?php

namespace App\Http\Controllers;

use App\Models\DocumentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DocumentRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $requests = DocumentRequest::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($requests);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'document_type' => ['required', 'string'],
            'purpose' => ['required', 'string', 'max:255'],
            'personal_info' => ['required', 'array'],
            'personal_info.full_name' => 'required|string',
            'personal_info.address' => 'required|string',
            'personal_info.birth_date' => 'required|date',
            'personal_info.civil_status' => 'required|string',
            'personal_info.occupation' => 'required|string',
        ]);
        $documentRequest = DocumentRequest::create([
            'user_id' => Auth::id(),
            'document_type' => $request->document_type,
            'purpose' => $request->purpose,
            'personal_info' => $request->personal_info,
            'fee' => $this->calculateFee($request->document_type)
        ]);
        return response()->json([
            'message' => 'Document request submitted successful',
            'request' => $documentRequest
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $request = DocumentRequest::where('user_id', Auth::id())
            ->findOrFail($id);
        return response()->json($request);
    }
    public function calculateFee($documentType)
    {
        $fees = [
            'barangay_clearance' => 50.00,
            'certificate_of_residency' => 30.00,
            'certificate_of_indigency' => 20.00,
            'business_permit' => 100.00,
            'building_permit' => 200.00,
            'barangay_id' => 80.00,
        ];
        return $fees[$documentType] ?? 0;
    }
}
